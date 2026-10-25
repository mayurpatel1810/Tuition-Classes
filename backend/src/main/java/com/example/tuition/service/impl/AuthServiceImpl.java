package com.example.tuition.service.impl;

import com.example.tuition.dto.request.LoginRequestDTO;
import com.example.tuition.dto.response.LoginResponseDTO;
import com.example.tuition.entity.User;
import com.example.tuition.repository.UserRepository;
import com.example.tuition.security.JwtUtil;
import com.example.tuition.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Override
    public LoginResponseDTO login(LoginRequestDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );

        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().getName());

        return LoginResponseDTO.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole().getName())
                .build();
    }
}
