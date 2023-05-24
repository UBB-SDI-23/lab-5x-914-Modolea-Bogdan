package com.example.a4.service;

import com.example.a4.dto.ChatHistoryRequest;
import com.example.a4.entity.ChatHistory;
import com.example.a4.repository.ChatHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatHistoryService {
    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    public ChatHistory saveChat(ChatHistoryRequest chatHistoryRequest) {
        ChatHistory chatHistory = new ChatHistory();
        int firstID = chatHistoryRepository.getFirstFreeID();
        chatHistory.setCid(firstID);
        chatHistory.setSenderName(chatHistoryRequest.getSenderName());
        chatHistory.setMessage(chatHistoryRequest.getMessage());
        return chatHistoryRepository.save(chatHistory);
    }
}
