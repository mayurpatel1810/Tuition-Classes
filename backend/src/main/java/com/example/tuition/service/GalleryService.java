package com.example.tuition.service;

import com.example.tuition.dto.request.GalleryRequestDTO;
import com.example.tuition.dto.response.GalleryResponseDTO;

import java.util.List;

public interface GalleryService {
    List<GalleryResponseDTO> getAll(String category);
    GalleryResponseDTO create(GalleryRequestDTO dto);
    GalleryResponseDTO update(Long id, GalleryRequestDTO dto);
    void delete(Long id);
}
