package com.example.a4.service;

import com.example.a4.dto.*;
import com.example.a4.entity.Fan;
import com.example.a4.entity.FanOfTeam;
import com.example.a4.entity.League;
import com.example.a4.entity.Team;
import com.example.a4.exception.EntityNotFoundException;
import com.example.a4.repository.FanOfTeamRepository;
import com.example.a4.repository.FanRepository;
import com.example.a4.repository.LeagueRepository;
import com.example.a4.repository.TeamRepository;
import com.example.a4.utils.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private LeagueRepository leagueRepository;
    @Autowired
    private FanRepository fanRepository;
    @Autowired
    private FanOfTeamRepository fanOfTeamRepository;

    public Team saveTeam(TeamRequest teamRequest) throws EntityNotFoundException {
        League league = leagueRepository.findById(teamRequest.getLeagueID()).orElse(null);
        if (league == null)
            throw new EntityNotFoundException(String.format("League with id %d doesn't exist!", teamRequest.getLeagueID()));

        Team newTeam = new Team();
        newTeam.setName(teamRequest.getName());
        newTeam.setTop(teamRequest.getTop());
        newTeam.setJungle(teamRequest.getJungle());
        newTeam.setMid(teamRequest.getMid());
        newTeam.setBot(teamRequest.getBot());
        newTeam.setSupport(teamRequest.getSupport());
        newTeam.setLeague(league);

        return teamRepository.save(newTeam);
    }

    public List<TeamGetAll> getTeams() throws EntityNotFoundException {
        List<Team> teams = teamRepository.findAll();
        if (teams.isEmpty())
            throw new EntityNotFoundException("No teams found!");

        List<TeamGetAll> teamGetAlls = new ArrayList<>();
        for (Team team : teams) {
            if (team.getLeague() != null) {
                TeamGetAll teamGetAll = new TeamGetAll(
                        team.getTid(),
                        team.getName(),
                        team.getTop(),
                        team.getJungle(),
                        team.getMid(),
                        team.getBot(),
                        team.getSupport(),
                        team.getLeague().getLid()
                );
                teamGetAlls.add(teamGetAll);
            }
        }

        return teamGetAlls;
    }

    public TeamByID getTeamById(int id) throws EntityNotFoundException {
        Team team = teamRepository.findById(id).orElse(null);
        if (team == null)
            throw new EntityNotFoundException(String.format("Team with id %d doesn't exist!", id));

        return new TeamByID(
                team.getTid(),
                team.getName(),
                team.getTop(),
                team.getJungle(),
                team.getMid(),
                team.getBot(),
                team.getSupport(),
                ObjectMapper.map(team.getLeague(), LeagueGetAll.class),
                team.getSupporter()
        );
    }

    public Team updateTeam(int id, TeamRequest teamRequest) throws EntityNotFoundException {
        Team existingTeam = teamRepository.findById(id).orElse(null);
        if (existingTeam == null)
            throw new EntityNotFoundException(String.format("Team with id %d doesn't exist!", id));

        League league = leagueRepository.findById(teamRequest.getLeagueID()).orElse(null);
        if (league == null) {
            throw new EntityNotFoundException(String.format("League with id %d doesn't exist!", teamRequest.getLeagueID()));
        }

        existingTeam.setName(teamRequest.getName());
        existingTeam.setTop(teamRequest.getTop());
        existingTeam.setJungle(teamRequest.getJungle());
        existingTeam.setMid(teamRequest.getMid());
        existingTeam.setBot(teamRequest.getBot());
        existingTeam.setSupport(teamRequest.getSupport());
        existingTeam.setLeague(league);

        return teamRepository.save(existingTeam);
    }

    public void deleteTeam(int id) throws EntityNotFoundException {
        Team existingTeam = teamRepository.findById(id).orElse(null);
        if (existingTeam == null)
            throw new EntityNotFoundException(String.format("Team with id %d doesn't exist!", id));

        teamRepository.delete(existingTeam);
    }

    public Team saveTeamFans(int id, FanAndTeam fan) throws EntityNotFoundException {
        Team existingTeam = teamRepository.findById(id).orElse(null);
        if (existingTeam == null)
            throw new EntityNotFoundException(String.format("Team with id %d doesn't exist!", id));

        Fan existingFan = fanRepository.findById(fan.getFid()).orElse(null);
        if (existingFan == null)
            throw new EntityNotFoundException(String.format("Fan with id %d doesn't exist!", id));

        FanOfTeam newFan = new FanOfTeam();
        newFan.setTeam(existingTeam);
        newFan.setFan(existingFan);
        newFan.setOpinion(fan.getOpinion());
        newFan.setFanSince(fan.getFanSince());
        existingFan.getSupporter().add(newFan);
        existingTeam.getSupporter().add(newFan);

        fanOfTeamRepository.save(newFan);
        return teamRepository.save(existingTeam);
    }

    public void deleteTeamFan(int teamID, int fanID) throws EntityNotFoundException {
        Fan existingFan = fanRepository.findById(fanID).orElse(null);
        if (existingFan == null)
            throw new EntityNotFoundException(String.format("Fan with id %d doesn't exist!", fanID));

        Team existingTeam = teamRepository.findById(teamID).orElse(null);
        if (existingTeam == null)
            throw new EntityNotFoundException(String.format("Team with id %d doesn't exist!", teamID));

        FanOfTeam existingFanOfTeam = existingFan.getSupporter().stream()
                .filter(fanOfTeam -> fanOfTeam.getTeam().getTid() == teamID)
                .filter(fanOfTeam -> fanOfTeam.getFan().getFid() == fanID)
                .findFirst()
                .orElse(null);

        if (existingFanOfTeam == null)
            throw new EntityNotFoundException(String.format("Fan with id %d doesn't support team %d!", fanID, teamID));

        existingFan.getSupporter().remove(existingFanOfTeam);
        fanRepository.save(existingFan);
    }
}