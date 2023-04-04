package com.example.a4.controller;

import com.example.a4.dto.*;
import com.example.a4.entity.Fan;
import com.example.a4.entity.FanOfTeam;
import com.example.a4.entity.League;
import com.example.a4.entity.Team;
import com.example.a4.exception.EntityNotFoundException;
import com.example.a4.service.FanService;
import com.example.a4.service.LeagueService;
import com.example.a4.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/teams")
public class TeamController {
    @Autowired
    private TeamService service;

    @PostMapping
    public ResponseEntity<Team> addTeam(@RequestBody @Valid TeamRequest teamRequest) throws EntityNotFoundException {
        return new ResponseEntity<>(service.saveTeam(teamRequest), HttpStatus.CREATED);
    }

    @PostMapping("/{teamID}/fans")
    public ResponseEntity<Team> addTeamFans(@PathVariable int teamID, @RequestBody FanAndTeam fanOfTeam) throws EntityNotFoundException {
        return new ResponseEntity<>(service.saveTeamFans(teamID, fanOfTeam), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TeamGetAll>> findAllTeams() throws EntityNotFoundException {
        return ResponseEntity.ok(service.getTeams());
    }

    @GetMapping("/{teamID}")
    public ResponseEntity<TeamByID> findTeamByID(@PathVariable int teamID) throws EntityNotFoundException {
        return ResponseEntity.ok(service.getTeamById(teamID));
    }

    @PutMapping("/{teamID}")
    public ResponseEntity<Team> updateTeam(@PathVariable int teamID, @RequestBody @Valid TeamRequest teamRequest) throws EntityNotFoundException {
        return ResponseEntity.ok(service.updateTeam(teamID, teamRequest));
    }

    @DeleteMapping("/{teamID}")
    public ResponseEntity<Void> deleteTeam(@PathVariable int teamID) throws EntityNotFoundException {
        service.deleteTeam(teamID);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{teamID}/fans/{fanID}")
    public ResponseEntity<Void> deleteTeamFan(@PathVariable int teamID, @PathVariable int fanID) throws EntityNotFoundException {
        service.deleteTeamFan(teamID, fanID);
        return ResponseEntity.noContent().build();
    }
}