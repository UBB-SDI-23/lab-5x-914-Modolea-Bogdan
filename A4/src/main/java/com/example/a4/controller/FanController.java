package com.example.a4.controller;

import com.example.a4.dto.*;
import com.example.a4.entity.Fan;
import com.example.a4.entity.FanOfTeam;
import com.example.a4.entity.League;
import com.example.a4.entity.Team;
import com.example.a4.exception.EntityNotFoundException;
import com.example.a4.service.FanService;
import com.example.a4.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/fans")
public class FanController {
    @Autowired
    private /*final*/ FanService service;

//    @Autowired
//    public FanController(FanService fanService){
//        service = fanService;
//    }

    @PostMapping
    public ResponseEntity<Fan> addFan(@RequestBody @Valid FanRequest fanRequest) throws EntityNotFoundException {
        return new ResponseEntity<>(service.saveFan(fanRequest), HttpStatus.CREATED);
    }

    @PostMapping("/{fanID}/teams")
    public ResponseEntity<Fan> addFanTeam(@PathVariable int fanID, @RequestBody FanOfTeam fanOfTeam) throws EntityNotFoundException{
        return new ResponseEntity<>(service.addFanToTeam(fanID, fanOfTeam), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FanGetAll>> findAllFans() throws EntityNotFoundException{
        return ResponseEntity.ok(service.getFans());
    }

    @GetMapping("/pagination/{offset}/{pageSize}")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Page<Fan>> findAllFansWithPagination(@PathVariable int offset, @PathVariable int pageSize) throws EntityNotFoundException {
        Page<Fan> allFans = service.findFansWithPagination(offset, pageSize);
        return ResponseEntity.ok(allFans);
    }

    @GetMapping("/stats/pagination/{offset}/{pageSize}")
    public ResponseEntity<Page<FanAndNoTeams>> findFanAndNoTeam(@PathVariable int offset, @PathVariable int pageSize) throws EntityNotFoundException {
        Page<FanAndNoTeams> allFans = service.findFanAndNoTeams(offset, pageSize);
        return ResponseEntity.ok(allFans);
    }

    @GetMapping("/{fanID}")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<FanByID> findFanByID(@PathVariable int fanID) throws EntityNotFoundException {
        return ResponseEntity.ok(service.getFanById(fanID));
    }

    @PutMapping("/{fanID}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_USER')")
    public ResponseEntity<Fan> updateFan(@PathVariable int fanID, @RequestBody @Valid FanRequest fanRequest, @RequestHeader("Authorization") String authorizationHeader) throws Exception {
        return ResponseEntity.ok(service.updateFan(fanID, fanRequest, authorizationHeader));
    }

    @DeleteMapping("/{fanID}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_USER')")
    public ResponseEntity<Void> deleteFan(@PathVariable int fanID, @RequestHeader("Authorization") String authorizationHeader) throws Exception {
        service.deleteFan(fanID, authorizationHeader);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{fanID}/teams/{teamID}")
    public ResponseEntity<Void> deleteFanTeam(@PathVariable int fanID, @PathVariable int teamID) throws EntityNotFoundException {
        service.deleteFanOfTeam(fanID, teamID);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter/{age}/pagination/{offset}/{pageSize}")
    public ResponseEntity<Page<FanGetAll>> findByAgeGreaterThan(@PathVariable int age, @PathVariable int offset, @PathVariable int pageSize) throws EntityNotFoundException{
        return ResponseEntity.ok(service.filterFansByAge(age, offset, pageSize));
    }

    @GetMapping("/numberNations/pagination/{offset}/{pageSize}")
    public ResponseEntity<Page<NumberNationalities>> findNumberNationalities(@PathVariable int offset, @PathVariable int pageSize) {
        return ResponseEntity.ok(service.findNumberNationalities(offset, pageSize));
    }
}
