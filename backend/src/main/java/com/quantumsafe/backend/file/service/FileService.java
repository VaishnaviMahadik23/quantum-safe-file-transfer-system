package com.quantumsafe.backend.file.service;

import com.quantumsafe.backend.auth.entity.User;
import com.quantumsafe.backend.crypto.aes.AesEncryptionResult;
import com.quantumsafe.backend.crypto.aes.AesEncryptionService;
import com.quantumsafe.backend.file.dto.FileUploadResponse;
import com.quantumsafe.backend.file.entity.FileMetadata;
import com.quantumsafe.backend.file.repository.FileMetadataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.SecretKey;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileMetadataRepository fileMetadataRepository;

    private final AesEncryptionService aesEncryptionService;

    public FileUploadResponse uploadFile(
            MultipartFile file,
            User user
    ) throws Exception {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "File cannot be empty"
            );
        }

        String originalFileName =
                file.getOriginalFilename();

        if (originalFileName == null
                || originalFileName.isBlank()) {

            throw new IllegalArgumentException(
                    "File name cannot be empty"
            );
        }

        /*
         * Read original file bytes.
         */
        byte[] plainData = file.getBytes();

        /*
         * Generate a new AES-256 key
         * for this file.
         */
        SecretKey aesKey =
                aesEncryptionService.generateKey();

        /*
         * Encrypt the file using AES-256-GCM.
         */
        AesEncryptionResult encryptionResult =
                aesEncryptionService.encrypt(
                        plainData,
                        aesKey
                );

        /*
         * Store encrypted file data and
         * encryption metadata.
         */
        FileMetadata fileMetadata =
                FileMetadata.builder()
                        .originalFileName(originalFileName)

                        .contentType(
                                file.getContentType() != null
                                        ? file.getContentType()
                                        : "application/octet-stream"
                        )

                        /*
                         * Keep original file size.
                         */
                        .fileSize(file.getSize())

                        /*
                         * IMPORTANT:
                         * This is now encrypted data.
                         */
                        .fileData(
                                encryptionResult
                                        .getEncryptedData()
                        )

                        .initializationVector(
                                encryptionResult.getIv()
                        )

                        .encryptionAlgorithm(
                                encryptionResult.getAlgorithm()
                        )

                        /*
                         * Will be populated when
                         * Kyber key protection is implemented.
                         */
                        .encryptionKeyId(null)

                        .owner(user)

                        .build();

        FileMetadata savedFile =
                fileMetadataRepository.save(fileMetadata);

        return FileUploadResponse.builder()
                .fileId(savedFile.getId())
                .fileName(
                        savedFile.getOriginalFileName()
                )
                .contentType(
                        savedFile.getContentType()
                )
                .fileSize(
                        savedFile.getFileSize()
                )
                .uploadedAt(
                        savedFile.getUploadedAt()
                )
                .message(
                        "File encrypted and uploaded successfully"
                )
                .build();
    }
}