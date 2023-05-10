package com.example.a4.service;

import com.example.a4.entity.user.UserInfo;
import com.example.a4.repository.UserInfoRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String addUser(UserInfo userInfo) {
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));

        String randomCode = RandomString.make(16);
//        System.out.println(randomCode);
        userInfo.setVerificationCode(randomCode);


        userInfoRepository.save(userInfo);
        return userInfo.getVerificationCode();
    }

    public String verifyUser(String code, UserInfo userInfo){
        System.out.println(code);
        System.out.println(userInfo.getVerificationCode());
        if(Objects.equals(code, userInfo.getVerificationCode())) {
            userInfo.setEnabled(true);
            System.out.println(userInfo);
            UserInfo user = userInfoRepository.findByName(userInfo.getName()).get();
//            UserInfo user = userInfoRepository.findByName(userInfo.getName());
            user.setEnabled(true);
            System.out.println(user);
            userInfoRepository.save(user);
            return "user validated";
        }

        return "user not valid";
    }

    public int getFirstFreeID() {
        return userInfoRepository.getFirstFreeID();
    }

    public Optional<UserInfo> getUser(String username){
        return userInfoRepository.findByName(username);
    }

    public int getLeagueCounter(String username){
        return userInfoRepository.getLeagueCounter(username);
    }

    public int getTeamCounter(String username){
        return userInfoRepository.getTeamCounter(username);
    }

    public int getFanCounter(String username){
        return userInfoRepository.getFanCounter(username);
    }
}
