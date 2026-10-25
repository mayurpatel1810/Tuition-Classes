package com.example.tuition.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GalleryRequestDTO {
    private String title;
    private String description;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    private String category;
}
