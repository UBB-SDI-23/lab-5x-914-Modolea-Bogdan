package com.example.a4.service;

import com.example.a4.dto.*;
import com.example.a4.entity.Fan;
import com.example.a4.entity.FanOfTeam;
import com.example.a4.entity.Team;
import com.example.a4.exception.EntityNotFoundException;
import com.example.a4.repository.FanOfTeamRepository;
import com.example.a4.repository.FanRepository;
import com.example.a4.repository.TeamRepository;
import com.example.a4.utils.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.Map.Entry;

@Service

public class FanService {
    @Autowired
    private FanRepository fanRepository;
    @Autowired
    private TeamRepository teamRepository;

    public Fan saveFan(FanRequest fanRequest) {
        Fan newFan = new Fan();
        newFan.setName(fanRequest.getName());
        newFan.setNationality(fanRequest.getNationality());
        newFan.setOccupation(fanRequest.getOccupation());
        newFan.setAge(fanRequest.getAge());
        newFan.setPlaceOfBirth(fanRequest.getPlaceOfBirth());

        return fanRepository.save(newFan);
    }

    public List<FanGetAll> getFans() throws EntityNotFoundException {
        List<Fan> fans = fanRepository.findAll();
        if (fans.isEmpty())
            throw new EntityNotFoundException("No fans found!");

        return ObjectMapper.mapAll(fans, FanGetAll.class);
    }

    public FanByID getFanById(int id) throws EntityNotFoundException {
        Fan fan = fanRepository.findById(id).orElse(null);
        if (fan == null)
            throw new EntityNotFoundException(String.format("No fan found with id %d", id));

        return new FanByID(
                fan.getFid(),
                fan.getName(),
                fan.getAge(),
                fan.getNationality(),
                fan.getOccupation(),
                fan.getPlaceOfBirth(),
                fan.getSupporter()
        );
    }

    public Fan updateFan(int id, FanRequest fanRequest) throws EntityNotFoundException {
        Fan existingFan = fanRepository.findById(id).orElse(null);
        if (existingFan == null)
            throw new EntityNotFoundException(String.format("No fan found with id %d", id));

        existingFan.setPlaceOfBirth(fanRequest.getPlaceOfBirth());
        existingFan.setAge(fanRequest.getAge());
        existingFan.setName(fanRequest.getName());
        existingFan.setNationality(fanRequest.getNationality());
        existingFan.setOccupation(fanRequest.getOccupation());

        return fanRepository.save(existingFan);
    }

    public void deleteFan(int id) throws EntityNotFoundException {
        Fan existingFan = fanRepository.findById(id).orElse(null);
        if (existingFan == null)
            throw new EntityNotFoundException(String.format("No fan found with id %d", id));

        fanRepository.delete(existingFan);
    }

    public void deleteFanOfTeam(int fanID, int teamID) throws EntityNotFoundException {
        Fan existingFan = fanRepository.findById(fanID).orElse(null);
        if (existingFan == null)
            throw new EntityNotFoundException(String.format("No fan found with id %d", fanID));

        Team existingTeam = teamRepository.findById(teamID).orElse(null);
        if (existingTeam == null)
            throw new EntityNotFoundException(String.format("No team found with id %d", teamID));

        FanOfTeam existingFanOfTeam = existingFan.getSupporter().stream()
                .filter(fanOfTeam -> fanOfTeam.getTeam().getTid() == teamID)
                .filter(fanOfTeam -> fanOfTeam.getFan().getFid() == fanID)
                .findFirst()
                .orElse(null);

        if (existingFanOfTeam == null)
            throw new EntityNotFoundException(String.format("Fan with id %d doesn't support team with id %d", fanID, teamID));

        existingFan.getSupporter().remove(existingFanOfTeam);
        fanRepository.save(existingFan);
    }

    public List<FanGetAll> filterFansByAge(int age) throws EntityNotFoundException {
        List<FanGetAll> fans = fanRepository.filterFansByAge(age);
        if (fans.isEmpty())
            throw new EntityNotFoundException(String.format("No fan with age greater than %d was found!", age));

        return ObjectMapper.mapAll(fans, FanGetAll.class);
    }

    public Fan addFanToTeam(int id, FanOfTeam fan) throws EntityNotFoundException {
        Fan existingFan = fanRepository.findById(id).orElse(null);
        if (existingFan == null)
            throw new EntityNotFoundException(String.format("No fan found with id %d", id));

        Team existingTeam = teamRepository.findById(fan.getTeam().getTid()).orElse(null);
        if (existingTeam == null)
            throw new EntityNotFoundException(String.format("No team found with id %d", fan.getTeam().getTid()));

        FanOfTeam fanOfTeam = new FanOfTeam();
        fanOfTeam.setFanSince(fan.getFanSince());
        fanOfTeam.setOpinion(fan.getOpinion());
        fanOfTeam.setFan(existingFan);
        fanOfTeam.setTeam(existingTeam);

        existingFan.getSupporter().add(fanOfTeam);
        return fanRepository.save(existingFan);
    }
}
