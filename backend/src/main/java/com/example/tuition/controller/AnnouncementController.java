package com.example.tuition.controller;

import com.example.tuition.dto.request.AnnouncementRequestDTO;
import com.example.tuition.dto.response.AnnouncementResponseDTO;
import com.example.tuition.dto.response.ApiResponse;
import com.example.tuition.service.AnnouncementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @GetMapping
    public ApiResponse<List<AnnouncementResponseDTO>> getAll() {
        return ApiResponse.success("Announcements fetched successfully", announcementService.getActive());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AnnouncementResponseDTO> create(@Valid @RequestBody AnnouncementRequestDTO dto) {
        return ApiResponse.success("Announcement created successfully", announcementService.create(dto));
    }

    @PutMapping("/{id}")
    public ApiResponse<AnnouncementResponseDTO> update(@PathVariable Long id, @Valid @RequestBody AnnouncementRequestDTO dto) {
        return ApiResponse.success("Announcement updated successfully", announcementService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        announcementService.delete(id);
        return ApiResponse.success("Announcement deleted successfully");
    }
}
