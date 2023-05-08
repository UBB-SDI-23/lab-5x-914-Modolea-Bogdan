package com.example.a4.repository;

import com.example.a4.dto.LeaguesAndNoTeams;
import com.example.a4.dto.NationalitiesAndLeagues;
import com.example.a4.entity.League;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LeagueRepository extends JpaRepository<League, Integer> {
    @Query("SELECT new com.example.a4.dto.NationalitiesAndLeagues(" +
            "l.lid, l.abbreviation, l.region, COUNT(f.id)) " +
            "FROM Team t JOIN t.league l " +
            "JOIN t.supporter f " +
            "GROUP BY l.lid "
    )
    Page<NationalitiesAndLeagues> getLeaguesByNations(Pageable pageable);

    @Query(
            "FROM League l " +
            "WHERE l.abbreviation like ?1"
    )
    League getLeagueByName(String league);

    @Query("SELECT new com.example.a4.dto.LeaguesAndNoTeams(" +
            "l.lid, l.abbreviation, l.region, l.year, l.bestPlayer, l.audience, l.description, COUNT(t.tid)) " +
            "FROM League l LEFT JOIN l.teams t " +
            "GROUP BY l.lid "
    )
    Page<LeaguesAndNoTeams> getLeaguesAndNoTeams(Pageable pageable);
}
