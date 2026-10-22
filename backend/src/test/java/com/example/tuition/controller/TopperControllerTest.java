package com.example.tuition.controller;

import com.example.tuition.entity.Role;
import com.example.tuition.entity.User;
import com.example.tuition.repository.RoleRepository;
import com.example.tuition.repository.UserRepository;
import com.example.tuition.security.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class TopperControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private RoleRepository roleRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    private String adminToken;

    @BeforeEach
    void setup() {
        // start every test from a clean set of users/roles (the app itself seeds an admin at startup)
        userRepository.deleteAll();
        roleRepository.deleteAll();
        Role adminRole = roleRepository.save(Role.builder().name("ROLE_ADMIN").build());
        userRepository.save(User.builder()
                .username("admin2").email("admin2@test.com")
                .password(passwordEncoder.encode("Admin@123"))
                .role(adminRole).build());
        adminToken = jwtUtil.generateToken("admin2", "ROLE_ADMIN");
    }

    @Test
    void getAllToppers_isPubliclyAccessible_withoutToken() throws Exception {
        mockMvc.perform(get("/api/toppers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void createTopper_withoutToken_isRejected() throws Exception {
        mockMvc.perform(post("/api/toppers")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(sampleTopper())))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void createTopper_withValidAdminToken_succeeds() throws Exception {
        mockMvc.perform(post("/api/toppers")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(sampleTopper())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.studentName").value("Rahul Patel"))
                .andExpect(jsonPath("$.data.id").exists());
    }

    @Test
    void createTopper_withInvalidData_returns400WithFieldErrors() throws Exception {
        mockMvc.perform(post("/api/toppers")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(Map.of(
                                "className", "Class 12", "year", 2026))))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.data.studentName").exists());
    }

    @Test
    void createTopper_withPercentageOver100_isRejected() throws Exception {
        Map<String, Object> invalid = sampleTopper();
        invalid.put("percentage", 150);
        mockMvc.perform(post("/api/toppers")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(invalid)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void updateNonExistentTopper_returns404() throws Exception {
        mockMvc.perform(put("/api/toppers/99999")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(sampleTopper())))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Topper not found with id: 99999"));
    }

    @Test
    void fullCrudLifecycle_createReadUpdateDelete() throws Exception {
        String createResponse = mockMvc.perform(post("/api/toppers")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(sampleTopper())))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        Long id = ((Number) objectMapper.readTree(createResponse).path("data").path("id").numberValue()).longValue();

        mockMvc.perform(get("/api/toppers/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.studentName").value("Rahul Patel"));

        Map<String, Object> updated = sampleTopper();
        updated.put("studentName", "Rahul Patel Updated");
        mockMvc.perform(put("/api/toppers/" + id)
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.studentName").value("Rahul Patel Updated"));

        mockMvc.perform(delete("/api/toppers/" + id)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/toppers/" + id))
                .andExpect(status().isNotFound());
    }

    private Map<String, Object> sampleTopper() {
        return new java.util.HashMap<>(Map.of(
                "studentName", "Rahul Patel",
                "className", "Class 12",
                "percentage", new BigDecimal("97.2"),
                "rank", 1,
                "exam", "Board Exam",
                "year", 2026,
                "achievement", "School Topper"
        ));
    }
}
