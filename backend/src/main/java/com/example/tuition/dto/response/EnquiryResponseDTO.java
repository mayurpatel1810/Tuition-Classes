package com.example.tuition.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnquiryResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;
    private String status;
    private LocalDateTime createdAt;
}
