package com.example.tuition.controller;

import com.example.tuition.dto.request.FacultyRequestDTO;
import com.example.tuition.dto.response.ApiResponse;
import com.example.tuition.dto.response.FacultyResponseDTO;
import com.example.tuition.service.FacultyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@RequiredArgsConstructor
public class FacultyController {

    private final FacultyService facultyService;

    @GetMapping
    public ApiResponse<List<FacultyResponseDTO>> getAll() {
        return ApiResponse.success("Faculty fetched successfully", facultyService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<FacultyResponseDTO> getById(@PathVariable Long id) {
        return ApiResponse.success("Faculty fetched successfully", facultyService.getById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<FacultyResponseDTO> create(@Valid @RequestBody FacultyRequestDTO dto) {
        return ApiResponse.success("Faculty created successfully", facultyService.create(dto));
    }

    @PutMapping("/{id}")
    public ApiResponse<FacultyResponseDTO> update(@PathVariable Long id, @Valid @RequestBody FacultyRequestDTO dto) {
        return ApiResponse.success("Faculty updated successfully", facultyService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        facultyService.delete(id);
        return ApiResponse.success("Faculty deleted successfully");
    }
}
