package com.example.tuition.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AnnouncementRequestDTO {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private LocalDate announcementDate;
    private Boolean important;
    private Boolean active;
}
