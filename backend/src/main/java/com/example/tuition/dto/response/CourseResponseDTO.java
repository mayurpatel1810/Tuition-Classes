package com.example.tuition.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String className;
    private String subjects;
    private String duration;
    private BigDecimal fees;
    private String imageUrl;
    private Boolean active;
}
