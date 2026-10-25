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
public class GalleryResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String category;
    private LocalDateTime createdAt;
}
