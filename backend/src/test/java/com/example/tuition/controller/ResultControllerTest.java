package com.example.tuition.controller;

import com.example.tuition.entity.Role;
import com.example.tuition.entity.User;
import com.example.tuition.repository.ResultRepository;
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

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ResultControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private RoleRepository roleRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private ResultRepository resultRepository;

    private String adminToken;

    @BeforeEach
    void setup() throws Exception {
        // start every test from a clean set of users/roles (the app itself seeds an admin at startup)
        resultRepository.deleteAll();
        userRepository.deleteAll();
        roleRepository.deleteAll();
        Role adminRole = roleRepository.save(Role.builder().name("ROLE_ADMIN").build());
        userRepository.save(User.builder().username("admin3").email("a3@test.com")
                .password(passwordEncoder.encode("Admin@123")).role(adminRole).build());
        adminToken = jwtUtil.generateToken("admin3", "ROLE_ADMIN");

        createResult("Amit Shah", "Class 10", "Board", 92.0, 2025);
        createResult("Priya Mehta", "Class 12", "Board", 95.5, 2026);
        createResult("Kunal Joshi", "Class 10", "Board", 88.0, 2026);
    }

    @Test
    void filterByYear_returnsOnlyMatchingResults() throws Exception {
        mockMvc.perform(get("/api/results").param("year", "2026"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2));
    }

    @Test
    void filterByClassName_returnsOnlyMatchingResults() throws Exception {
        mockMvc.perform(get("/api/results").param("className", "Class 10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2));
    }

    @Test
    void filterByYearAndClass_combinesFiltersCorrectly() throws Exception {
        mockMvc.perform(get("/api/results")
                        .param("year", "2026")
                        .param("className", "Class 10")
                        .param("exam", "Board"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[0].studentName").value("Kunal Joshi"));
    }

    @Test
    void noFilters_returnsAllResults() throws Exception {
        mockMvc.perform(get("/api/results"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(3));
    }

    private void createResult(String name, String className, String exam, double percentage, int year) throws Exception {
        mockMvc.perform(post("/api/results")
                .header("Authorization", "Bearer " + adminToken)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(Map.of(
                        "studentName", name, "className", className, "exam", exam,
                        "percentage", percentage, "year", year))));
    }
}
