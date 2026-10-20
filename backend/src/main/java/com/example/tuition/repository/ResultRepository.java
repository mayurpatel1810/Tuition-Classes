package com.example.tuition.repository;

import com.example.tuition.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByYearAndClassNameAndExam(Integer year, String className, String exam);
    List<Result> findByYear(Integer year);
    List<Result> findByClassName(String className);
    List<Result> findByExam(String exam);
}
