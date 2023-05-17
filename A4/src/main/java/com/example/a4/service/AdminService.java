package com.example.a4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

@Service
public class AdminService {
    @Autowired
    private Environment env;

    public void dropAll() throws SQLException {
        try {
            Connection conn = DriverManager.getConnection(
                    env.getRequiredProperty("spring.datasource.url"),
                    env.getRequiredProperty("spring.datasource.username"),
                    env.getRequiredProperty("spring.datasource.password"));
            List<String> statementsStrings = Arrays.asList(
                    "TRUNCATE TABLE esport2.fan_tbl;",
                    "TRUNCATE TABLE esport2.team_tbl;",
                    "TRUNCATE TABLE esport2.league_tbl;"
            );
            statementsStrings.forEach(statementString -> {
                try {
                    Statement statement = conn.createStatement();
                    statement.execute(statementString);
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            });
            conn.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void populateLeagueDB() {
        try {
            Connection conn = DriverManager.getConnection(
                    env.getRequiredProperty("spring.datasource.url"),
                    env.getRequiredProperty("spring.datasource.username"),
                    env.getRequiredProperty("spring.datasource.password"));
            Scanner scanner = new Scanner(new BufferedReader(new FileReader("populateLeague.sql")));
            scanner.useDelimiter(";");

            while (scanner.hasNext()) {
                String statementString = scanner.next();
                System.out.println(statementString);
                Statement statement = conn.createStatement();
                statement.execute(statementString);
            }
            conn.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void populateTeamDB() {
        try {
            Connection conn = DriverManager.getConnection(
                    env.getRequiredProperty("spring.datasource.url"),
                    env.getRequiredProperty("spring.datasource.username"),
                    env.getRequiredProperty("spring.datasource.password"));
            Scanner scanner = new Scanner(new BufferedReader(new FileReader("populateTeams.sql")));
            scanner.useDelimiter(";");

            while (scanner.hasNext()) {
                String statementString = scanner.next();
                System.out.println(statementString);
                Statement statement = conn.createStatement();
                statement.execute(statementString);
            }
            conn.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void populateFanDB() {
        try {
            Connection conn = DriverManager.getConnection(
                    env.getRequiredProperty("spring.datasource.url"),
                    env.getRequiredProperty("spring.datasource.username"),
                    env.getRequiredProperty("spring.datasource.password"));
            Scanner scanner = new Scanner(new BufferedReader(new FileReader("populateFanTable.sql")));
            scanner.useDelimiter(";");

            while (scanner.hasNext()) {
                String statementString = scanner.next();
                System.out.println(statementString);
                Statement statement = conn.createStatement();
                statement.execute(statementString);
            }
            conn.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
