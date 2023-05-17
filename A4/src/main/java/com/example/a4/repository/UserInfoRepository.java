package com.example.a4.repository;

import com.example.a4.entity.user.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByName(String username);

    @Query("SELECT MIN(t1.id + 1) " +
            "FROM UserInfo t1 " +
            "LEFT JOIN UserInfo t2 " +
            "ON t1.id + 1 = t2.id " +
            "where t2.id = null")
    int getFirstFreeID();

    @Query("SELECT COUNT(u.lid) " +
            "FROM League u " +
            "WHERE u.user.name = ?1")
    int getLeagueCounter(String username);

    @Query("SELECT COUNT(u.tid) " +
            "FROM Team u " +
            "WHERE u.user.name = ?1")
    int getTeamCounter(String username);

    @Query("SELECT COUNT(u.fid) " +
            "FROM Fan u " +
            "WHERE u.user.name = ?1")
    int getFanCounter(String username);

    @Query("SELECT u.roles " +
            "FROM UserInfo u " +
            "WHERE u.name = ?1")
    String getRoleByUsername(String username);

    @Query("update UserInfo u " +
            "set u.recordsOnPage = ?1 " +
            "where u.id > 0")
    void updateAllUsersPage(int noPages);
}
