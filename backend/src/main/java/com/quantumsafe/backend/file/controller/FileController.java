package com.quantumsafe.backend.file.controller;

import com.quantumsafe.backend.auth.entity.User;
import com.quantumsafe.backend.auth.repository.UserRepository;
import com.quantumsafe.backend.file.dto.FileUploadResponse;
import com.quantumsafe.backend.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;
    private final UserRepository userRepository;

    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) throws Exception {

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Authenticated user not found"
                        )
                );

        FileUploadResponse response =
                fileService.uploadFile(file, user);

        return ResponseEntity.ok(response);
    }
}