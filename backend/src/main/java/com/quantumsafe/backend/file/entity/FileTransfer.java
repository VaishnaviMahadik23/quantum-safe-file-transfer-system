package com.quantumsafe.backend.file.entity;

import com.quantumsafe.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "file_transfers",
        indexes = {
                @Index(name = "idx_file_transfers_sender", columnList = "sender_id"),
                @Index(name = "idx_file_transfers_receiver", columnList = "receiver_id"),
                @Index(name = "idx_file_transfers_status", columnList = "status")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileTransfer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /**
     * Original filename supplied by the sender.
     */
    @Column(nullable = false, length = 255)
    private String originalFilename;

    /**
     * Name/reference used for the encrypted stored file.
     */
    @Column(nullable = false, length = 255)
    private String storedFilename;

    /**
     * Original file size in bytes.
     */
    @Column(nullable = false)
    private Long fileSize;

    /**
     * MIME type of the original file.
     */
    @Column(length = 150)
    private String contentType;

    /**
     * User who uploaded the file.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "sender_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_file_transfer_sender")
    )
    private User sender;

    /**
     * User who is allowed to receive/download the file.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "receiver_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_file_transfer_receiver")
    )
    private User receiver;

    /**
     * SHA3-256 hash of the original plaintext file.
     *
     * Stored as hexadecimal text.
     */
    @Column(name = "original_file_hash", length = 64)
    private String originalFileHash;

    /**
     * SHA3-256 hash of the encrypted file/package.
     *
     * Stored as hexadecimal text.
     */
    @Column(name = "encrypted_file_hash", length = 64)
    private String encryptedFileHash;

    /**
     * Encryption algorithm used for the file.
     */
    @Column(name = "encryption_algorithm", length = 50)
    private String encryptionAlgorithm;

    /**
     * Post-quantum key encapsulation mechanism.
     */
    @Column(name = "kem_algorithm", length = 50)
    private String kemAlgorithm;

    /**
     * Post-quantum digital signature algorithm.
     */
    @Column(name = "signature_algorithm", length = 50)
    private String signatureAlgorithm;

    /**
     * Current state of the file transfer.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private FileTransferStatus status = FileTransferStatus.PENDING;

    /**
     * Creation timestamp.
     */
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Last update timestamp.
     */
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}