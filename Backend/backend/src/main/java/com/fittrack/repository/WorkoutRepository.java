package com.fittrack.repository;

import com.fittrack.entity.User;
import com.fittrack.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    List<Workout> findByUserOrderByDateDesc(User user);

    List<Workout> findByUserAndDate(User user, LocalDate date);

    List<Workout> findByUserAndDateBetweenOrderByDateAsc(User user, LocalDate start, LocalDate end);
}
