package com.example.tuition.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstituteInformationResponseDTO {
    private Long id;
    private String instituteName;
    private String tagline;
    private String address;
    private String phone;
    private String email;
    private String about;
    private String logoUrl;
}
