package com.example.tuition.controller;

import com.example.tuition.dto.request.GalleryRequestDTO;
import com.example.tuition.dto.response.ApiResponse;
import com.example.tuition.dto.response.GalleryResponseDTO;
import com.example.tuition.service.GalleryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;

    @GetMapping
    public ApiResponse<List<GalleryResponseDTO>> getAll(@RequestParam(required = false) String category) {
        return ApiResponse.success("Gallery fetched successfully", galleryService.getAll(category));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<GalleryResponseDTO> create(@Valid @RequestBody GalleryRequestDTO dto) {
        return ApiResponse.success("Gallery item created successfully", galleryService.create(dto));
    }

    @PutMapping("/{id}")
    public ApiResponse<GalleryResponseDTO> update(@PathVariable Long id, @Valid @RequestBody GalleryRequestDTO dto) {
        return ApiResponse.success("Gallery item updated successfully", galleryService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        galleryService.delete(id);
        return ApiResponse.success("Gallery item deleted successfully");
    }
}
