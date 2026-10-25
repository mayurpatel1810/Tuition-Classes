package com.example.tuition.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(name = "class_name", nullable = false)
    private String className;

    private String exam;

    @Column(precision = 5, scale = 2)
    private BigDecimal percentage;

    private Integer rank;

    private Integer year;

    private String achievement;
}
