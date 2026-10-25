package com.example.tuition.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InstituteInformationRequestDTO {
    @NotBlank(message = "Institute name is required")
    private String instituteName;

    private String tagline;
    private String address;
    private String phone;
    private String email;
    private String about;
    private String logoUrl;
}
