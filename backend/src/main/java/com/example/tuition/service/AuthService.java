package com.example.tuition.service;

import com.example.tuition.dto.request.LoginRequestDTO;
import com.example.tuition.dto.response.LoginResponseDTO;

public interface AuthService {
    LoginResponseDTO login(LoginRequestDTO dto);
}
