package com.quantumsafe.backend.key.entity;

import com.quantumsafe.backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "user_crypto_keys",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_user_crypto_keys_user",
                        columnNames = "user_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCryptoKey {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // One crypto-key record belongs to one user
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ---------- ML-KEM-768 ----------

    @Lob
    @Column(name = "ml_kem_public_key", nullable = false)
    private byte[] mlKemPublicKey;

    @Lob
    @Column(name = "ml_kem_private_key_encrypted", nullable = false)
    private byte[] mlKemPrivateKeyEncrypted;

    @Column(name = "ml_kem_algorithm", nullable = false, length = 50)
    @Builder.Default
    private String mlKemAlgorithm = "ML-KEM-768";

    // ---------- ML-DSA-65 ----------

    @Lob
    @Column(name = "ml_dsa_public_key", nullable = false)
    private byte[] mlDsaPublicKey;

    @Lob
    @Column(name = "ml_dsa_private_key_encrypted", nullable = false)
    private byte[] mlDsaPrivateKeyEncrypted;

    @Column(name = "ml_dsa_algorithm", nullable = false, length = 50)
    @Builder.Default
    private String mlDsaAlgorithm = "ML-DSA-65";

    // ---------- Private-key protection ----------

    @Column(name = "ml_kem_private_key_iv", nullable = false, columnDefinition = "bytea")
    private byte[] mlKemPrivateKeyIv;
    
    @Column(name = "ml_dsa_private_key_iv", nullable = false, columnDefinition = "bytea")
    private byte[] mlDsaPrivateKeyIv;

    @Column(
            name = "private_key_encryption_algorithm",
            nullable = false,
            length = 50
    )
    @Builder.Default
    private String privateKeyEncryptionAlgorithm = "AES-256-GCM";

    // ---------- Timestamp ----------

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}