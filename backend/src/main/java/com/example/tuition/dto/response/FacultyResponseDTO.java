package com.example.tuition.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacultyResponseDTO {
    private Long id;
    private String name;
    private String subject;
    private String qualification;
    private String experience;
    private String description;
    private String photoUrl;
}
