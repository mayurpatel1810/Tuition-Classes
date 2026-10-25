package com.example.tuition.controller;

import com.example.tuition.dto.request.CourseRequestDTO;
import com.example.tuition.dto.response.ApiResponse;
import com.example.tuition.dto.response.CourseResponseDTO;
import com.example.tuition.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ApiResponse<List<CourseResponseDTO>> getAll() {
        return ApiResponse.success("Courses fetched successfully", courseService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<CourseResponseDTO> getById(@PathVariable Long id) {
        return ApiResponse.success("Course fetched successfully", courseService.getById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<CourseResponseDTO> create(@Valid @RequestBody CourseRequestDTO dto) {
        return ApiResponse.success("Course created successfully", courseService.create(dto));
    }

    @PutMapping("/{id}")
    public ApiResponse<CourseResponseDTO> update(@PathVariable Long id, @Valid @RequestBody CourseRequestDTO dto) {
        return ApiResponse.success("Course updated successfully", courseService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        courseService.delete(id);
        return ApiResponse.success("Course deleted successfully");
    }
}
