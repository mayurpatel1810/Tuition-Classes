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
public class ResultResponseDTO {
    private Long id;
    private String studentName;
    private String className;
    private String exam;
    private BigDecimal percentage;
    private Integer rank;
    private Integer year;
    private String achievement;
}
