package com.example.tuition.mapper;

import com.example.tuition.dto.request.GalleryRequestDTO;
import com.example.tuition.dto.response.GalleryResponseDTO;
import com.example.tuition.entity.Gallery;
import org.springframework.stereotype.Component;

@Component
public class GalleryMapper {

    public Gallery toEntity(GalleryRequestDTO dto) {
        return Gallery.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory())
                .build();
    }

    public void updateEntity(Gallery gallery, GalleryRequestDTO dto) {
        gallery.setTitle(dto.getTitle());
        gallery.setDescription(dto.getDescription());
        gallery.setImageUrl(dto.getImageUrl());
        gallery.setCategory(dto.getCategory());
    }

    public GalleryResponseDTO toResponseDTO(Gallery gallery) {
        return GalleryResponseDTO.builder()
                .id(gallery.getId())
                .title(gallery.getTitle())
                .description(gallery.getDescription())
                .imageUrl(gallery.getImageUrl())
                .category(gallery.getCategory())
                .createdAt(gallery.getCreatedAt())
                .build();
    }
}
