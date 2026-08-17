package com.quantumsafe.backend.file.service;

import com.quantumsafe.backend.auth.entity.User;
import com.quantumsafe.backend.file.dto.FileUploadResponse;
import com.quantumsafe.backend.file.entity.FileMetadata;
import com.quantumsafe.backend.file.repository.FileMetadataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileMetadataRepository fileMetadataRepository;

    public FileUploadResponse uploadFile(
            MultipartFile file,
            User user
    ) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null || originalFileName.isBlank()) {
            throw new IllegalArgumentException(
                    "File name cannot be empty"
            );
        }

        FileMetadata fileMetadata = FileMetadata.builder()
                .originalFileName(originalFileName)
                .contentType(
                        file.getContentType() != null
                                ? file.getContentType()
                                : "application/octet-stream"
                )
                .fileSize(file.getSize())
                .fileData(file.getBytes())
                .owner(user)
                .build();

        FileMetadata savedFile =
                fileMetadataRepository.save(fileMetadata);

        return FileUploadResponse.builder()
                .fileId(savedFile.getId())
                .fileName(savedFile.getOriginalFileName())
                .contentType(savedFile.getContentType())
                .fileSize(savedFile.getFileSize())
                .uploadedAt(savedFile.getUploadedAt())
                .message("File uploaded successfully")
                .build();
    }
}