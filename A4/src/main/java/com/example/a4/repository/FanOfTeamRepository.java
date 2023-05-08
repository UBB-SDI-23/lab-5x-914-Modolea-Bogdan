package com.example.a4.repository;

import com.example.a4.entity.FanOfTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FanOfTeamRepository extends JpaRepository<FanOfTeam, Integer> {

    @Query("SELECT MIN(t1.id + 1) " +
            "FROM FanOfTeam t1 " +
            "LEFT JOIN FanOfTeam t2 " +
            "ON t1.id + 1 = t2.id " +
            "where t2.id = null")
    int getFirstFreeID();
}
