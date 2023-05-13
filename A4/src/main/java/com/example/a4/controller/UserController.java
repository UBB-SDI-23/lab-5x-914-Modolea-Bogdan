package com.example.a4.controller;

import com.example.a4.dto.AuthRequest;
import com.example.a4.dto.DateAndCode;
import com.example.a4.entity.user.UserInfo;
import com.example.a4.service.JwtService;
import com.example.a4.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public DateAndCode addUser(@RequestBody UserInfo userInfo){
        userInfo.setId(userService.getFirstFreeID());
        userInfo.setRoles("ROLE_USER");
        userInfo.setEnabled(false);
        return userService.addUser(userInfo);
    }

    @PutMapping("/register/verify/{code}")
    public String activateUser(@PathVariable String code, @RequestBody UserInfo userInfo) {
        return userService.verifyUser(code, userInfo);
    }


    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        if(authentication.isAuthenticated())
            return jwtService.generateToken(authRequest.getUsername());
        else
            throw new UsernameNotFoundException("invalid user request");
    }

    @GetMapping("/{username}")
    public Optional<UserInfo> getUser(@PathVariable String username) {
        return userService.getUser(username);
    }

    @GetMapping("/getUsername/{token}")
    public String getUsernameFromToken(@PathVariable String token) {
        return jwtService.extractUsername(token);
    }

    @GetMapping("/{username}/leagues")
    public int getLeagueCounter(@PathVariable String username){
        return userService.getLeagueCounter(username);
    }

    @GetMapping("/{username}/teams")
    public int getTeamCounter(@PathVariable String username){
        return userService.getTeamCounter(username);
    }

    @GetMapping("/{username}/fans")
    public int getFanCounter(@PathVariable String username){
        return userService.getFanCounter(username);
    }
}
