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
     *
     * Currently stored as PostgreSQL Large Object (OID)
     * to match the existing database schema.
     */
    @Lob
    @Column(nullable = false)
    private byte[] fileData;

    /**
     * Random 12-byte GCM initialization vector.
     *
     * Stored directly as PostgreSQL BYTEA.
     */
    @Column(
            name = "initialization_vector",
            nullable = false,
            columnDefinition = "bytea"
    )
    private byte[] initializationVector;

    /**
     * Encryption algorithm used for this file.
     */
    @Column(nullable = false, length = 50)
    @Builder.Default
    private String encryptionAlgorithm = "AES-256-GCM";

    /**
     * Will be connected to the protected AES-key
     * management / Kyber wrapping mechanism later.
     */
    @Column(length = 100)
    private String encryptionKeyId;

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