package com.example.tuition.controller;

import com.example.tuition.dto.request.TopperRequestDTO;
import com.example.tuition.dto.response.ApiResponse;
import com.example.tuition.dto.response.TopperResponseDTO;
import com.example.tuition.service.TopperService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/toppers")
@RequiredArgsConstructor
public class TopperController {

    private final TopperService topperService;

    @GetMapping
    public ApiResponse<List<TopperResponseDTO>> getAll() {
        return ApiResponse.success("Toppers fetched successfully", topperService.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<TopperResponseDTO> getById(@PathVariable Long id) {
        return ApiResponse.success("Topper fetched successfully", topperService.getById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<TopperResponseDTO> create(@Valid @RequestBody TopperRequestDTO dto) {
        return ApiResponse.success("Topper created successfully", topperService.create(dto));
    }

    @PutMapping("/{id}")
    public ApiResponse<TopperResponseDTO> update(@PathVariable Long id, @Valid @RequestBody TopperRequestDTO dto) {
        return ApiResponse.success("Topper updated successfully", topperService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        topperService.delete(id);
        return ApiResponse.success("Topper deleted successfully");
    }
}
