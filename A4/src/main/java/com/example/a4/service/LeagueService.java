package com.example.a4.service;

import com.example.a4.dto.*;
import com.example.a4.entity.Fan;
import com.example.a4.entity.FanOfTeam;
import com.example.a4.entity.League;
import com.example.a4.entity.Team;
import com.example.a4.entity.user.UserInfo;
import com.example.a4.exception.EntityNotFoundException;
import com.example.a4.repository.*;
import com.example.a4.utils.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LeagueService {
    @Autowired
    private LeagueRepository leagueRepository;
    @Autowired
    private FanOfTeamRepository fanOfTeamRepository;
    @Autowired
    private FanRepository fanRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;

    public League saveLeague(LeagueRequest leagueRequest) throws EntityNotFoundException {
        League newLeague = new League();

        Page<League> data = findLeaguesWithPagination(0, 1);
        int totalElems = (int) data.getTotalElements();
        League lastLeague = findLeaguesWithPagination((totalElems - 1), 1).getContent().get(0);
        leagueRequest.setLid(lastLeague.getLid() + 1);
        newLeague.setLid(lastLeague.getLid() + 1);

        Optional<UserInfo> userInfo = userInfoRepository.findByName(leagueRequest.getUsername());
        System.out.println(userInfo.get());
        System.out.println(leagueRequest.getUsername());

        //ObjectMapper.map(leagueRequest, newLeague);
        newLeague.setLid(lastLeague.getLid() + 1);
        newLeague.setYear(leagueRequest.getYear());
        newLeague.setAbbreviation(leagueRequest.getAbbreviation());
        newLeague.setRegion(leagueRequest.getRegion());
        newLeague.setAudience(leagueRequest.getAudience());
        newLeague.setBestPlayer(leagueRequest.getBestPlayer());
        newLeague.setDescription(leagueRequest.getDescription());
        newLeague.setUser(userInfo.get());

        System.out.println(newLeague);
        return leagueRepository.save(newLeague);
    }

    public List<LeagueGetAll> getLeagues() throws EntityNotFoundException{
        List<League> leagues = leagueRepository.findAll();
        if(leagues.isEmpty())
            throw new EntityNotFoundException("No league found!");

        return ObjectMapper.mapAll(leagues, LeagueGetAll.class);
    }

    public Page<League> findLeaguesWithPagination(int offset, int pageSize) throws EntityNotFoundException {
        Page<League> leagues = leagueRepository.findAll(PageRequest.of(offset, pageSize));
        return leagues;
    }

    public Page<LeaguesAndNoTeams> findLeaguesAndNoTeams(int offset, int pageSize) {
        Page<LeaguesAndNoTeams> leaguesAndNoTeams = leagueRepository.getLeaguesAndNoTeams(PageRequest.of(offset, pageSize));
        return leaguesAndNoTeams;
    }

    public League getLeagueById(int id) throws EntityNotFoundException{
        League league = leagueRepository.findById(id).orElse(null);
        if(league == null)
            throw new EntityNotFoundException(String.format("League with id %d doesn't exist!", id));

        return league;
    }

    public League updateLeague(int id, LeagueRequest leagueRequest, String authorizationHeader) throws Exception {
        League existingLeague = leagueRepository.findById(id).orElse(null);
        if(existingLeague == null)
            throw new EntityNotFoundException(String.format("League with id %d doesn't exist!", id));

        String username = existingLeague.getUser().getName();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String usernameToCompare = authentication.getName();
        UserInfo user = userInfoRepository.findByName(usernameToCompare).get();
        String role = user.getRoles();

        if((Objects.equals(username, usernameToCompare) && Objects.equals(role, "ROLE_USER")) || (Objects.equals(role, "ROLE_MODERATOR")) || (Objects.equals(role, "ROLE_ADMIN"))) {
            existingLeague.setAbbreviation(leagueRequest.getAbbreviation());
            existingLeague.setYear(leagueRequest.getYear());
            existingLeague.setRegion(leagueRequest.getRegion());
            existingLeague.setAudience(leagueRequest.getAudience());
            existingLeague.setBestPlayer(leagueRequest.getBestPlayer());
            return leagueRepository.save(existingLeague);
        }
        throw new Exception("Not allowed to update league");
    }

    public void deleteLeague(int id, String authorizationHeader) throws Exception {
        League existingLeague = leagueRepository.findById(id).orElse(null);
        if(existingLeague == null)
            throw new EntityNotFoundException(String.format("League with id %d doesn't exist!", id));

        String username = existingLeague.getUser().getName();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String usernameToCompare = authentication.getName();
        UserInfo user = userInfoRepository.findByName(usernameToCompare).get();
        String role = user.getRoles();

        if((Objects.equals(username, usernameToCompare) && Objects.equals(role, "ROLE_USER")) || (Objects.equals(role, "ROLE_MODERATOR")) || (Objects.equals(role, "ROLE_ADMIN"))) {
            leagueRepository.delete(existingLeague);
        }
        else
            throw new Exception("Not allowed to delete league!");
    }

    public Page<NationalitiesAndLeagues> getLeaguesByNations(int offset, int pageSize) throws EntityNotFoundException{
        Page<NationalitiesAndLeagues> leagues = leagueRepository.getLeaguesByNations(PageRequest.of(offset, pageSize));
        if(leagues.isEmpty())
            throw new EntityNotFoundException("No league found!");

        return leagues;
    }

    public League addTeamListToLeague(int id, List<Integer> teamIDs) throws EntityNotFoundException{
        League league = leagueRepository.findById(id).orElse(null);
        if(league == null)
            throw new EntityNotFoundException(String.format("League with id %d doesn't exist!", id));

        List<TeamAssignLeague> teams = new ArrayList<>();
        List<Team> allTeams = teamRepository.findAll();
        for(Team team : allTeams) {
            if (teamIDs.contains(team.getTid()))
                teams.add(new TeamAssignLeague(team.getTid(), team.getName(), team.getTop(), team.getJungle(), team.getMid(), team.getBot(), team.getSupport()));
        }

        List<Team> mappedTeams = ObjectMapper.mapAll(teams, Team.class);
        for(Team team : mappedTeams){
            team.setLeague(league);
            teamRepository.save(team);
        }

        return leagueRepository.save(league);
    }

    public League getLeagueByName(String league){
        return leagueRepository.getLeagueByName(league);
    }
}
