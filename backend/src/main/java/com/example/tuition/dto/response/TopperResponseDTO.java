package com.example.tuition.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopperResponseDTO {
    private Long id;
    private String studentName;
    private String className;
    private BigDecimal percentage;
    private Integer rank;
    private String exam;
    private Integer year;
    private String achievement;
    private String photoUrl;
    private LocalDateTime createdAt;
}
