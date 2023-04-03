package com.example.a4.repository;

import com.example.a4.dto.FanGetAll;
import com.example.a4.entity.Fan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FanRepository extends JpaRepository<Fan, Integer> {

    @Query("SELECT new com.example.a4.dto.FanGetAll(" +
            "f.fid, f.name, f.age, f.nationality, f.occupation, f.placeOfBirth) " +
            "FROM Fan f " +
            "WHERE f.age > ?1"
    )
    public List<FanGetAll> filterFansByAge(int age);
}
