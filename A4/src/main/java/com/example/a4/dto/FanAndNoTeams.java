package com.example.a4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FanAndNoTeams {
    private int fid;
    private String name;
    private int age;
    private String nationality;
    private String occupation;
    private String placeOfBirth;
    private long counter;
}
