package com.example.tuition.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FacultyRequestDTO {
    @NotBlank(message = "Name is required")
    private String name;

    private String subject;
    private String qualification;
    private String experience;
    private String description;
    private String photoUrl;
}
