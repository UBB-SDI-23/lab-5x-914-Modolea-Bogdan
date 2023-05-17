package com.example.a4.controller;

import com.example.a4.service.AdminService;
import com.example.a4.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private UserService userService;

    @PostMapping("/admin/drop-all")
    public String dropAll() throws SQLException {
        adminService.dropAll();
        return "All data deleted";
    }

    @PostMapping("/admin/populate-leagues")
    public String populateAllLeagues() {
        adminService.populateLeagueDB();

        return "Populated database";
    }

    @PostMapping("/admin/populate-teams")
    public String populateAllTeams() {
        adminService.populateTeamDB();

        return "Populated database";
    }

    @PostMapping("/admin/populate-fans")
    public String poulateAllFans() {
        adminService.populateFanDB();

        return "Populated database";
    }

    @PostMapping("/admin/updatePages/{noPages}")
    public void updateAllPages(@PathVariable int noPages) throws SQLException {
        userService.updateAllUsersPage(noPages);
    }
}
