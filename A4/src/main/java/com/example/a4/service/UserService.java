package com.example.a4.service;

import com.example.a4.dto.DateAndCode;
import com.example.a4.dto.LeaguesAndNoTeams;
import com.example.a4.dto.RolePage;
import com.example.a4.entity.user.UserInfo;
import com.example.a4.repository.UserInfoRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public DateAndCode addUser(UserInfo userInfo) {
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));

        String randomCode = RandomString.make(16);
//        System.out.println(randomCode);
        userInfo.setVerificationCode(randomCode);
        userInfo.setConfirmationCodeSentAt(LocalDateTime.now());
        System.out.println(userInfo.getConfirmationCodeSentAt());

        userInfoRepository.save(userInfo);
        return new DateAndCode(userInfo.getVerificationCode(), userInfo.getConfirmationCodeSentAt());
    }

    public String verifyUser(String code, UserInfo userInfo) {
        System.out.println(userInfo.getConfirmationCodeSentAt());
        if (Objects.equals(code, userInfo.getVerificationCode()) && Duration.between(userInfo.getConfirmationCodeSentAt(), LocalDateTime.now()).toMinutes() <= 10) {
            userInfo.setEnabled(true);
            UserInfo user = userInfoRepository.findByName(userInfo.getName()).get();
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

    public Optional<UserInfo> getUser(String username) {
        return userInfoRepository.findByName(username);
    }

    public int getLeagueCounter(String username) {
        return userInfoRepository.getLeagueCounter(username);
    }

    public int getTeamCounter(String username) {
        return userInfoRepository.getTeamCounter(username);
    }

    public int getFanCounter(String username) {
        return userInfoRepository.getFanCounter(username);
    }

    public String getUserRole(String username) {
        return userInfoRepository.getRoleByUsername(username);
    }

    public Page<UserInfo> findUsersWithPagination(int offset, int pageSize) {
        Page<UserInfo> users = userInfoRepository.findAll(PageRequest.of(offset, pageSize));
        return users;
    }

    public UserInfo updateRolePage(String username, RolePage rolePage, String authorizationHeader) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String usernameAdmin = authentication.getName();

        UserInfo userInfo = userInfoRepository.findByName(username).get();
        userInfo.setRoles(rolePage.getRole());
        userInfo.setRecordsOnPage(rolePage.getNumberOfPages());

        UserInfo adminInfo = userInfoRepository.findByName(usernameAdmin).get();

        System.out.println(usernameAdmin);
        System.out.println(userInfo.getRoles());

        if(Objects.equals(adminInfo.getRoles(), "ROLE_ADMIN"))
            return userInfoRepository.save(userInfo);
        throw new Exception("Not allowed to edit user!");
    }

    public UserInfo updatePage(String username, int noPages) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String usernameAdmin = authentication.getName();
//        UserInfo adminInfo = userInfoRepository.findByName(usernameAdmin).get();

//        System.out.println("\n\n\n");
//        System.out.println(adminInfo.getName());
//        System.out.println("\n\n\n");

        UserInfo userInfo = userInfoRepository.findByName(username).get();
        userInfo.setRecordsOnPage(noPages);

//        if(Objects.equals(adminInfo.getRoles(), "ROLE_ADMIN") || Objects.equals(usernameAdmin, userInfo.getName()))
            return userInfoRepository.save(userInfo);
//        throw new Exception("Not allowed to edit user!");
    }
}
