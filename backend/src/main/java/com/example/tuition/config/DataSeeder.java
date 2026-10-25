package com.example.tuition.config;

import com.example.tuition.entity.Role;
import com.example.tuition.entity.User;
import com.example.tuition.repository.RoleRepository;
import com.example.tuition.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_ADMIN").build()));

        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@brightfuture.edu")
                    .password(passwordEncoder.encode("Mayur@06"))
                    .role(adminRole)
                    .build();
            userRepository.save(admin);
            System.out.println("Seeded default admin user -> username: admin | password: Mayur@06");
        }
    }
}
