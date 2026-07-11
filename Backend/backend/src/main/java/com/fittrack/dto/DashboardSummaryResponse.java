package com.fittrack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardSummaryResponse {
    private Integer totalCaloriesToday;
    private Integer workoutsToday;
    private Integer totalCaloriesThisWeek;
    private Integer totalWorkoutsThisWeek;
}
