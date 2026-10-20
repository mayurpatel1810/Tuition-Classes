package com.example.tuition.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TopperRequestDTO {
    @NotBlank(message = "Student name is required")
    private String studentName;

    @NotBlank(message = "Class is required")
    private String className;

    @NotNull(message = "Percentage is required")
    @DecimalMin(value = "0.0", message = "Percentage cannot be negative")
    @DecimalMax(value = "100.0", message = "Percentage cannot exceed 100")
    private BigDecimal percentage;

    @Positive(message = "Rank must be a positive number")
    private Integer rank;

    private String exam;

    @NotNull(message = "Year is required")
    private Integer year;

    private String achievement;

    private String photoUrl;
}
