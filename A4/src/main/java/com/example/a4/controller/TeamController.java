package com.example.a4.controller;

import com.example.a4.dto.LeagueAndTeam;
import com.example.a4.dto.LeagueIdAndTeams;
import com.example.a4.dto.ReadHelper;
import com.example.a4.entity.Fan;
import com.example.a4.entity.FanOfTeam;
import com.example.a4.entity.League;
import com.example.a4.entity.Team;
import com.example.a4.service.FanService;
import com.example.a4.service.LeagueService;
import com.example.a4.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin
public class TeamController {
    @Autowired
    private TeamService service;
    @Autowired
    private LeagueService leagueService;
    @Autowired
    private FanService fanService;

    @CrossOrigin
    @PostMapping("/addTeam")
    public Team addOneTeam(@RequestBody Team team) {
        team.setLeague(null);
        return service.saveTeam(team);
    }

    @CrossOrigin
    @PostMapping("/league/{id}/addTeam")
    public Team addTeam(@PathVariable int id, @RequestBody Team team) {
        League league = leagueService.getLeagueById(id);
        team.setLeague(league);
        return service.saveTeam(team);
    }

    @CrossOrigin
    @PostMapping("/league/{id}/addTeams")
    public List<Team> addTeams(@PathVariable int id, @RequestBody List<Team> teams) {
        League league = leagueService.getLeagueById(id);
        List<Team> myTeams = service.getTeams();
        List<Team> newTeams = new ArrayList<>();
        for(Team team : teams) {
            for(Team myTeam : myTeams){
                if(Objects.equals(myTeam.getName(), team.getName())){
                    team.setLeague(league);
                    newTeams.add(team);
                    break;
                }
            }
        }
        league.setTeams(newTeams);
        return service.saveTeams(newTeams);
    }

    @CrossOrigin
    @GetMapping("/teams")
    public List<Team> findAllTeams() {
        return service.getTeams();
    }

    @CrossOrigin
    @GetMapping("/team/{id}")
    public Team findTeamById(@PathVariable int id) {
        return service.getTeamById(id);
    }

    @CrossOrigin
    @PutMapping("/updateTeam/{id}")
    public Team updateTeam(@RequestBody Team team, @PathVariable int id) {
        return service.updateTeam(team, id);
    }

    @CrossOrigin
    @DeleteMapping("deleteTeam/{id}")
    public String deleteTeam(@PathVariable int id) {
        return service.deleteTeam(id);
    }

    @CrossOrigin
    @GetMapping("/teams/task")
    public List<LeagueIdAndTeams> findAllTeamsTask() {
        List<Team> teams = service.getTeams();
        List<League> leagues = leagueService.getLeaguesWithoutNull();
        List<LeagueIdAndTeams> ans = new ArrayList<>();
        for (Team team : teams) {
            for (League league : leagues) {
                List<Team> newTeams = league.getTeams();
                for (Team newTeam : newTeams) {
                    if (Objects.equals(newTeam.getName(), team.getName())) {
                        ans.add(new LeagueIdAndTeams(league.getLid(), team));
                        break;
                    }
                }
            }
        }

        return ans;
    }

    @CrossOrigin
    @GetMapping("/team/task/{id}")
    public List<LeagueAndTeam> findTeamByIdTask(@PathVariable int id) {
        List<LeagueAndTeam> ans = new ArrayList<>();
        Team team = service.getTeamById(id);
        List<League> leagues = leagueService.getLeaguesWithoutNull();
        for (League league : leagues) {
            List<Team> newTeams = league.getTeams();
            for (Team newTeam : newTeams) {
                if (Objects.equals(newTeam.getName(), team.getName())) {
                    ans.add(new LeagueAndTeam(team, league));
                    break;
                }
            }
        }

        for (LeagueAndTeam elem : ans)
            elem.getLeague().setTeams(null);

        return ans;
    }
}
