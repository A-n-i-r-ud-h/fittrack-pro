package com.fittrack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class WorkoutResponse {
    private Long id;
    private String name;
    private Integer duration;
    private Integer calories;
    private LocalDate date;
}
