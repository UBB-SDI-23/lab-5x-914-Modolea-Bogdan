package com.example.a4.repository;

import com.example.a4.dto.NationalitiesAndLeagues;
import com.example.a4.entity.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LeagueRepository extends JpaRepository<League, Integer> {
    @Query("SELECT new com.example.a4.dto.NationalitiesAndLeagues(" +
            "l.lid, l.abbreviation, l.region, COUNT(f.id)) " +
            "FROM Team t JOIN t.league l " +
            "JOIN t.supporter f " +
            "GROUP BY l.lid " +
            "ORDER BY COUNT(f) DESC"
    )
    List<NationalitiesAndLeagues> getLeaguesByNations();
}
