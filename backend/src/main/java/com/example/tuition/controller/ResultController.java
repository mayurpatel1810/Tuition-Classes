package com.example.tuition.controller;

import com.example.tuition.dto.request.ResultRequestDTO;
import com.example.tuition.dto.response.ApiResponse;
import com.example.tuition.dto.response.ResultResponseDTO;
import com.example.tuition.service.ResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @GetMapping
    public ApiResponse<List<ResultResponseDTO>> getAll(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String className,
            @RequestParam(required = false) String exam) {
        return ApiResponse.success("Results fetched successfully",
                resultService.getFiltered(year, className, exam));
    }

    @GetMapping("/{id}")
    public ApiResponse<ResultResponseDTO> getById(@PathVariable Long id) {
        return ApiResponse.success("Result fetched successfully", resultService.getById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ResultResponseDTO> create(@Valid @RequestBody ResultRequestDTO dto) {
        return ApiResponse.success("Result created successfully", resultService.create(dto));
    }

    @PutMapping("/{id}")
    public ApiResponse<ResultResponseDTO> update(@PathVariable Long id, @Valid @RequestBody ResultRequestDTO dto) {
        return ApiResponse.success("Result updated successfully", resultService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        resultService.delete(id);
        return ApiResponse.success("Result deleted successfully");
    }
}
