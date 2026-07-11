package com.fittrack.controller;

import com.fittrack.dto.*;
import com.fittrack.entity.User;
import com.fittrack.service.WorkoutService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

    @GetMapping
    public ResponseEntity<List<WorkoutResponse>> getWorkouts(
            @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(workoutService.getWorkouts(user));
    }

    @PostMapping
    public ResponseEntity<WorkoutResponse> addWorkout(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody WorkoutRequest request) {

        WorkoutResponse response = workoutService.addWorkout(user, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {

        workoutService.deleteWorkout(user, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> getSummary(
            @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(workoutService.getSummary(user));
    }

    @GetMapping("/weekly")
    public ResponseEntity<List<DailyStat>> getWeeklyStats(
            @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(workoutService.getWeeklyStats(user));
    }
}