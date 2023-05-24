package com.example.a4.repository;

import com.example.a4.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Integer> {
    @Query("SELECT MIN(ch1.cid + 1) " +
            "FROM ChatHistory ch1 " +
            "LEFT JOIN ChatHistory ch2 " +
            "ON ch1.cid + 1 = ch2.cid " +
            "where ch2.cid = null")
    int getFirstFreeID();
}
