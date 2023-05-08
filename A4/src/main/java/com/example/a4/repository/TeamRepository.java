package com.example.a4.repository;

import com.example.a4.dto.TeamAndNoFans;
import com.example.a4.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    @Query("SELECT new com.example.a4.dto.TeamAndNoFans(" +
            "t.tid, t.name, t.top, t.jungle, t.mid, t.bot, t.support, COUNT(t.tid)) " +
            "FROM Team t LEFT JOIN t.supporter f " +
            "GROUP BY t.tid"
    )
    Page<TeamAndNoFans> getTeamAndNoFans(Pageable pageable);


    @Query("" +
            "from Team t " +
            "where t.name = ?1")
    Team findTeamByName(String teamName);
}
