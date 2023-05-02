package com.example.a4.controller;

import com.example.a4.dto.LeagueGetAll;
import com.example.a4.dto.LeagueRequest;
import com.example.a4.dto.NationalitiesAndLeagues;
import com.example.a4.entity.League;
import com.example.a4.entity.Team;
import com.example.a4.exception.EntityNotFoundException;
import com.example.a4.service.LeagueService;
import com.example.a4.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/leagues")
public class LeagueController {
    @Autowired
    private LeagueService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity<League> addLeague(@RequestBody @Valid LeagueRequest leagueRequest) throws EntityNotFoundException {
        return new ResponseEntity<>(service.saveLeague(leagueRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LeagueGetAll>> findAllLeagues() throws EntityNotFoundException{
        return ResponseEntity.ok(service.getLeagues());
    }

    @GetMapping("/pagination/{offset}/{pageSize}")
    public ResponseEntity<Page<League>> findAllLeaguesWithPagination(@PathVariable int offset, @PathVariable int pageSize) throws EntityNotFoundException {
        Page<League> allLeagues = service.findLeaguesWithPagination(offset, pageSize);
        return ResponseEntity.ok(allLeagues);
    }

    @GetMapping("/{leagueID}")
    public ResponseEntity<League> findLeagueByID(@PathVariable int leagueID) throws EntityNotFoundException{
        return ResponseEntity.ok(service.getLeagueById(leagueID));
    }

    @PutMapping("/{leagueID}")
    public ResponseEntity<League> updateLeague(@PathVariable int leagueID, @RequestBody @Valid LeagueRequest leagueRequest) throws EntityNotFoundException{
        return ResponseEntity.ok(service.updateLeague(leagueID, leagueRequest));
    }

    @DeleteMapping("/{leagueID}")
    public ResponseEntity<Void> deleteLeague(@PathVariable int leagueID) throws EntityNotFoundException{
        service.deleteLeague(leagueID);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/number-of-nations-that-supports-league")
    public ResponseEntity<List<NationalitiesAndLeagues>> getLeaguesByNations() throws EntityNotFoundException{
        return ResponseEntity.ok(service.getLeaguesByNations());
    }

    @PostMapping("/{leagueID}/teams")
    public ResponseEntity<League> addTeamListToLeague(@PathVariable int leagueID, @RequestBody List<Integer> teams) throws EntityNotFoundException{
        return new ResponseEntity<>(service.addTeamListToLeague(leagueID, teams), HttpStatus.CREATED);
    }
}
