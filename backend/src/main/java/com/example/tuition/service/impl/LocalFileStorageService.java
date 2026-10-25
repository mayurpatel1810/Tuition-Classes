package com.example.tuition.service.impl;

import com.example.tuition.exception.FileStorageException;
import com.example.tuition.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class LocalFileStorageService implements FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    private static final List<String> ALLOWED_TYPES = List.of("image/jpeg", "image/png", "image/webp", "image/gif");
    private static final long MAX_SIZE_BYTES = 5 * 1024 * 1024;

    @Override
    public String store(MultipartFile file) {
        validate(file);

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalName = file.getOriginalFilename();
            String extension = originalName != null && originalName.contains(".")
                    ? originalName.substring(originalName.lastIndexOf("."))
                    : "";

            String storedFilename = UUID.randomUUID() + extension;

            Path targetPath = uploadPath.resolve(storedFilename);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + storedFilename;

        } catch (IOException ex) {
            throw new FileStorageException("Failed to store file: " + ex.getMessage());
        }
    }

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new FileStorageException("No file was provided");
        }
        if (file.getSize() > MAX_SIZE_BYTES) {
            throw new FileStorageException("File size exceeds the 5MB limit");
        }
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new FileStorageException("Only JPEG, PNG, WEBP, and GIF images are allowed");
        }
    }
}
