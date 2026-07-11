package com.fittrack.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class WorkoutRequest {

    @NotBlank(message = "Exercise name is required")
    private String name;

    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be greater than 0")
    private Integer duration;

    @NotNull(message = "Calories burned is required")
    @Positive(message = "Calories must be greater than 0")
    private Integer calories;

    @NotNull(message = "Date is required")
    private LocalDate date;
}
