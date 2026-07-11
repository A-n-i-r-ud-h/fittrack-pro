package com.fittrack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class DailyStat {
    private LocalDate date;
    private Integer calories;
    private Integer workouts;
}
