package com.example.tuition.controller;

import com.example.tuition.dto.request.LoginRequestDTO;
import com.example.tuition.dto.response.ApiResponse;
import com.example.tuition.dto.response.LoginResponseDTO;
import com.example.tuition.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
        return ApiResponse.success("Login successful", authService.login(dto));
    }
}
