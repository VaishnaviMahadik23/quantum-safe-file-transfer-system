package com.quantumsafe.backend.file.service;

import com.quantumsafe.backend.auth.entity.User;
import com.quantumsafe.backend.crypto.aes.AesEncryptionResult;
import com.quantumsafe.backend.crypto.aes.AesEncryptionService;
import com.quantumsafe.backend.crypto.mlkem.MlKemKeyManagementService;
import com.quantumsafe.backend.crypto.mlkem.MlKemKeyProtectionService;
import com.quantumsafe.backend.file.dto.FileUploadResponse;
import com.quantumsafe.backend.file.entity.FileMetadata;
import com.quantumsafe.backend.file.repository.FileMetadataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.SecretKey;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileMetadataRepository fileMetadataRepository;

    private final AesEncryptionService aesEncryptionService;

    private final MlKemKeyManagementService mlKemKeyManagementService;

    private final MlKemKeyProtectionService mlKemKeyProtectionService;

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
        byte[] plainData =
                file.getBytes();

        /*
         * Generate a fresh AES-256 key
         * for this file.
         */
        SecretKey aesKey =
                aesEncryptionService.generateKey();

        /*
         * Encrypt the actual file using
         * AES-256-GCM.
         */
        AesEncryptionResult encryptionResult =
                aesEncryptionService.encrypt(
                        plainData,
                        aesKey
                );

        /*
         * Generate an ML-KEM-768 key pair.
         *
         * The returned key ID identifies the
         * recipient key pair.
         */
        String encryptionKeyId =
                mlKemKeyManagementService
                        .generateKeyPair();

        /*
         * Retrieve the ML-KEM public key.
         */
        var mlKemPublicKey =
                mlKemKeyManagementService
                        .getPublicKey(
                                encryptionKeyId
                        );

        /*
         * Protect the AES file key using
         * ML-KEM-768 + HKDF-SHA-256 +
         * AES-256-GCM.
         */
        MlKemKeyProtectionService
                .MlKemKeyProtectionResult
                keyProtectionResult =
                mlKemKeyProtectionService.protect(
                        aesKey,
                        mlKemPublicKey
                );

        /*
         * Build file metadata.
         */
        FileMetadata fileMetadata =
                FileMetadata.builder()

                        .originalFileName(
                                originalFileName
                        )

                        .contentType(
                                file.getContentType() != null
                                        ? file.getContentType()
                                        : "application/octet-stream"
                        )

                        .fileSize(
                                file.getSize()
                        )

                        /*
                         * AES-256-GCM encrypted file.
                         */
                        .fileData(
                                encryptionResult
                                        .getEncryptedData()
                        )

                        /*
                         * IV for file encryption.
                         */
                        .initializationVector(
                                encryptionResult.getIv()
                        )

                        .encryptionAlgorithm(
                                encryptionResult.getAlgorithm()
                        )

                        /*
                         * ML-KEM key identifier.
                         */
                        .encryptionKeyId(
                                encryptionKeyId
                        )

                        /*
                         * ML-KEM-768 ciphertext.
                         */
                        .kemCiphertext(
                                keyProtectionResult
                                        .kemCiphertext()
                        )

                        /*
                         * AES file key protected using
                         * AES-256-GCM.
                         */
                        .wrappedAesKey(
                                keyProtectionResult
                                        .wrappedAesKey()
                        )

                        /*
                         * IV used to wrap AES key.
                         */
                        .wrapIv(
                                keyProtectionResult
                                        .wrapIv()
                        )

                        .kemAlgorithm(
                                keyProtectionResult
                                        .kemAlgorithm()
                        )

                        .kdfAlgorithm(
                                keyProtectionResult
                                        .kdfAlgorithm()
                        )

                        .wrappingAlgorithm(
                                keyProtectionResult
                                        .wrappingAlgorithm()
                        )

                        .owner(user)

                        .build();

        /*
         * Save encrypted file + protected AES key
         * + ML-KEM metadata.
         */
        FileMetadata savedFile =
                fileMetadataRepository.save(
                        fileMetadata
                );

        /*
         * Do NOT return the AES key or ML-KEM
         * shared secret to the client.
         */
        return FileUploadResponse.builder()

                .fileId(
                        savedFile.getId()
                )

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
                        "File encrypted with AES-256-GCM and AES key protected with ML-KEM-768"
                )

                .build();
    }
}