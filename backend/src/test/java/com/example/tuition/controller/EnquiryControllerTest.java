package com.example.tuition.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class EnquiryControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    @Test
    void submitEnquiry_isPubliclyAccessible() throws Exception {
        mockMvc.perform(post("/api/enquiries")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(Map.of(
                                "name", "Test Parent",
                                "email", "parent@test.com",
                                "phone", "9999999999",
                                "message", "Interested in Class 10 batch"))))
                .andExpect(status().isCreated());
    }

    @Test
    void submitEnquiry_withInvalidEmail_returns400() throws Exception {
        mockMvc.perform(post("/api/enquiries")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(Map.of(
                                "name", "Test Parent",
                                "email", "not-an-email",
                                "message", "Test message"))))
                .andExpect(status().isBadRequest());
    }

    @Test
    void listEnquiries_withoutToken_isBlocked() throws Exception {
        mockMvc.perform(get("/api/enquiries"))
                .andExpect(status().isUnauthorized());
    }
}
