package com.example.tuition.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ResultRequestDTO {
    @NotBlank(message = "Student name is required")
    private String studentName;

    @NotBlank(message = "Class is required")
    private String className;

    private String exam;

    @DecimalMin(value = "0.0", message = "Percentage cannot be negative")
    @DecimalMax(value = "100.0", message = "Percentage cannot exceed 100")
    private BigDecimal percentage;

    private Integer rank;

    @NotNull(message = "Year is required")
    private Integer year;

    private String achievement;
}
