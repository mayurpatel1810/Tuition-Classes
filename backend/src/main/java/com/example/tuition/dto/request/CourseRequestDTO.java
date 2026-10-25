package com.example.tuition.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CourseRequestDTO {
    @NotBlank(message = "Course name is required")
    private String name;

    private String description;
    private String className;
    private String subjects;
    private String duration;

    @PositiveOrZero(message = "Fees cannot be negative")
    private BigDecimal fees;

    private String imageUrl;
    private Boolean active;
}
