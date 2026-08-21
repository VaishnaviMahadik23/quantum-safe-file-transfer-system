package com.quantumsafe.backend.file.entity;

import com.quantumsafe.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "file_metadata")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String originalFileName;

    @Column(nullable = false, length = 100)
    private String contentType;

    @Column(nullable = false)
    private Long fileSize;

    /**
     * AES-256-GCM encrypted file contents.
     */
    @Lob
    @Column(nullable = false)
    private byte[] fileData;

    /**
     * IV used for AES-256-GCM file encryption.
     */
    @Column(
            name = "initialization_vector",
            nullable = false,
            columnDefinition = "bytea"
    )
    private byte[] initializationVector;

    /**
     * Encryption algorithm used for file contents.
     */
    @Column(nullable = false, length = 50)
    @Builder.Default
    private String encryptionAlgorithm = "AES-256-GCM";

    /**
     * Identifier of the ML-KEM-768 key pair
     * used to protect the AES key.
     */
    @Column(name = "encryption_key_id", length = 100)
    private String encryptionKeyId;

    /**
     * ML-KEM-768 encapsulation ciphertext.
     *
     * This is public cryptographic metadata and
     * is required during AES-key recovery.
     */
    @Column(
            name = "kem_ciphertext",
            nullable = false,
            columnDefinition = "bytea"
    )
    private byte[] kemCiphertext;

    /**
     * AES-256-GCM encrypted/wrapped AES file key.
     */
    @Column(
            name = "wrapped_aes_key",
            nullable = false,
            columnDefinition = "bytea"
    )
    private byte[] wrappedAesKey;

    /**
     * IV used when wrapping the AES file key.
     */
    @Column(
            name = "wrap_iv",
            nullable = false,
            columnDefinition = "bytea"
    )
    private byte[] wrapIv;

    /**
     * KEM algorithm.
     */
    @Column(
            name = "kem_algorithm",
            nullable = false,
            length = 50
    )
    @Builder.Default
    private String kemAlgorithm = "ML-KEM-768";

    /**
     * KDF used to derive the AES key-wrapping key.
     */
    @Column(
            name = "kdf_algorithm",
            nullable = false,
            length = 50
    )
    @Builder.Default
    private String kdfAlgorithm = "HKDF-SHA-256";

    /**
     * Algorithm used to wrap the AES file key.
     */
    @Column(
            name = "wrapping_algorithm",
            nullable = false,
            length = 50
    )
    @Builder.Default
    private String wrappingAlgorithm = "AES-256-GCM";

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(nullable = false, updatable = false)
    private LocalDateTime uploadedAt;

    @PrePersist
    protected void onCreate() {
        uploadedAt = LocalDateTime.now();
    }
}