package com.fittrack.service;

import com.fittrack.dto.DashboardSummaryResponse;
import com.fittrack.dto.WorkoutRequest;
import com.fittrack.dto.WorkoutResponse;
import com.fittrack.entity.User;
import com.fittrack.entity.Workout;
import com.fittrack.exception.ApiException;
import com.fittrack.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    public List<WorkoutResponse> getWorkouts(User user) {
        return workoutRepository.findByUserOrderByDateDesc(user).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public WorkoutResponse addWorkout(User user, WorkoutRequest request) {
        Workout workout = new Workout();
        workout.setUser(user);
        workout.setName(request.getName());
        workout.setDuration(request.getDuration());
        workout.setCalories(request.getCalories());
        workout.setDate(request.getDate());

        Workout saved = workoutRepository.save(workout);
        return toResponse(saved);
    }

    public void deleteWorkout(User user, Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new ApiException("Workout not found", HttpStatus.NOT_FOUND));

        if (!workout.getUser().getId().equals(user.getId())) {
            throw new ApiException("You are not allowed to delete this workout", HttpStatus.FORBIDDEN);
        }

        workoutRepository.delete(workout);
    }

    public DashboardSummaryResponse getSummary(User user) {
        LocalDate today = LocalDate.now();
        LocalDate weekStart = today.minusDays(6);

        List<Workout> todayWorkouts = workoutRepository.findByUserAndDate(user, today);
        List<Workout> weekWorkouts = workoutRepository.findByUserAndDateBetweenOrderByDateAsc(user, weekStart, today);

        int caloriesToday = todayWorkouts.stream().mapToInt(Workout::getCalories).sum();
        int caloriesWeek = weekWorkouts.stream().mapToInt(Workout::getCalories).sum();

        return new DashboardSummaryResponse(
                caloriesToday,
                todayWorkouts.size(),
                caloriesWeek,
                weekWorkouts.size()
        );
    }

    public List<com.fittrack.dto.DailyStat> getWeeklyStats(User user) {
        LocalDate today = LocalDate.now();
        LocalDate weekStart = today.minusDays(6);

        List<Workout> weekWorkouts = workoutRepository.findByUserAndDateBetweenOrderByDateAsc(user, weekStart, today);

        return weekStart.datesUntil(today.plusDays(1))
                .map(date -> {
                    List<Workout> dayWorkouts = weekWorkouts.stream()
                            .filter(w -> w.getDate().equals(date))
                            .collect(Collectors.toList());
                    int calories = dayWorkouts.stream().mapToInt(Workout::getCalories).sum();
                    return new com.fittrack.dto.DailyStat(date, calories, dayWorkouts.size());
                })
                .collect(Collectors.toList());
    }

    private WorkoutResponse toResponse(Workout workout) {
        return new WorkoutResponse(
                workout.getId(),
                workout.getName(),
                workout.getDuration(),
                workout.getCalories(),
                workout.getDate()
        );
    }
}
