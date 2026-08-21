package com.quantumsafe.backend.crypto.mlkem;

import org.bouncycastle.crypto.digests.SHA256Digest;
import org.bouncycastle.crypto.generators.HKDFBytesGenerator;
import org.bouncycastle.crypto.params.HKDFParameters;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPrivateKeyParameters;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPublicKeyParameters;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;

@Service
public class MlKemKeyProtectionService {

    private static final String KEM_ALGORITHM = "ML-KEM-768";

    private static final String KDF_ALGORITHM = "HKDF-SHA-256";

    private static final String WRAPPING_ALGORITHM = "AES-256-GCM";

    private static final int AES_KEY_LENGTH = 32;

    private static final int GCM_IV_LENGTH = 12;

    private static final int GCM_TAG_LENGTH = 128;

    private final MlKemEncryptionService encryptionService;

    private final SecureRandom secureRandom;

    public MlKemKeyProtectionService(
            MlKemEncryptionService encryptionService) {

        this.encryptionService = encryptionService;
        this.secureRandom = new SecureRandom();
    }

    /**
     * Protects an AES-256 file encryption key using
     * ML-KEM-768.
     *
     * Process:
     *
     * AES key
     *    ↓
     * ML-KEM encapsulation
     *    ↓
     * shared secret
     *    ↓
     * HKDF-SHA-256
     *    ↓
     * AES-256 wrapping key
     *    ↓
     * AES-256-GCM
     *    ↓
     * wrapped AES key
     */
    public MlKemKeyProtectionResult protect(
            SecretKey aesKey,
            MLKEMPublicKeyParameters publicKey) {

        if (aesKey == null) {
            throw new IllegalArgumentException(
                    "AES key cannot be null"
            );
        }

        if (publicKey == null) {
            throw new IllegalArgumentException(
                    "ML-KEM public key cannot be null"
            );
        }

        byte[] aesKeyBytes = aesKey.getEncoded();

        if (aesKeyBytes == null
                || aesKeyBytes.length != AES_KEY_LENGTH) {

            throw new IllegalArgumentException(
                    "AES key must be exactly 256 bits"
            );
        }

        /*
         * Perform ML-KEM-768 encapsulation.
         */
        MlKemEncryptionService.MlKemEncapsulationResult
                encapsulation =
                encryptionService.encapsulate(publicKey);

        /*
         * Derive a 256-bit AES wrapping key
         * from the ML-KEM shared secret.
         */
        byte[] wrappingKeyBytes =
                deriveWrappingKey(
                        encapsulation.sharedSecret()
                );

        SecretKey wrappingKey =
                new SecretKeySpec(
                        wrappingKeyBytes,
                        "AES"
                );

        /*
         * Generate a fresh 12-byte GCM IV.
         */
        byte[] wrapIv =
                new byte[GCM_IV_LENGTH];

        secureRandom.nextBytes(wrapIv);

        /*
         * Wrap the AES file key.
         */
        byte[] wrappedAesKey =
                encryptAesKey(
                        aesKeyBytes,
                        wrappingKey,
                        wrapIv
                );

        /*
         * Clear derived wrapping key from memory.
         */
        java.util.Arrays.fill(
                wrappingKeyBytes,
                (byte) 0
        );

        return new MlKemKeyProtectionResult(
                encapsulation.ciphertext(),
                wrappedAesKey,
                wrapIv,
                KEM_ALGORITHM,
                KDF_ALGORITHM,
                WRAPPING_ALGORITHM
        );
    }

    /**
     * Recovers the original AES-256 key.
     */
    public SecretKey unprotect(
            MlKemKeyProtectionResult protectionResult,
            MLKEMPrivateKeyParameters privateKey)
            throws Exception {

        if (protectionResult == null) {
            throw new IllegalArgumentException(
                    "Protection result cannot be null"
            );
        }

        if (privateKey == null) {
            throw new IllegalArgumentException(
                    "ML-KEM private key cannot be null"
            );
        }

        /*
         * Recover ML-KEM shared secret.
         */
        byte[] sharedSecret =
                encryptionService.decapsulate(
                        privateKey,
                        protectionResult.kemCiphertext()
                );

        /*
         * Derive the same wrapping key.
         */
        byte[] wrappingKeyBytes =
                deriveWrappingKey(sharedSecret);

        SecretKey wrappingKey =
                new SecretKeySpec(
                        wrappingKeyBytes,
                        "AES"
                );

        /*
         * Recover the original AES file key.
         */
        byte[] aesKeyBytes =
                decryptAesKey(
                        protectionResult.wrappedAesKey(),
                        wrappingKey,
                        protectionResult.wrapIv()
                );

        java.util.Arrays.fill(
                wrappingKeyBytes,
                (byte) 0
        );

        if (aesKeyBytes.length != AES_KEY_LENGTH) {
            throw new IllegalStateException(
                    "Recovered AES key is not 256 bits"
            );
        }

        return new SecretKeySpec(
                aesKeyBytes,
                "AES"
        );
    }

    /**
     * HKDF-SHA-256 key derivation.
     */
    private byte[] deriveWrappingKey(
            byte[] sharedSecret) {

        HKDFBytesGenerator hkdf =
                new HKDFBytesGenerator(
                        new SHA256Digest()
                );

        byte[] info =
                "QuantumSafeFileTransfer-AES-Key-Wrapping"
                        .getBytes(
                                java.nio.charset.StandardCharsets.UTF_8
                        );

        hkdf.init(
                new HKDFParameters(
                        sharedSecret,
                        null,
                        info
                )
        );

        byte[] wrappingKey =
                new byte[AES_KEY_LENGTH];

        hkdf.generateBytes(
                wrappingKey,
                0,
                wrappingKey.length
        );

        return wrappingKey;
    }

    /**
     * AES-256-GCM encryption of the AES file key.
     */
    private byte[] encryptAesKey(
            byte[] aesKeyBytes,
            SecretKey wrappingKey,
            byte[] iv) {

        try {

            Cipher cipher =
                    Cipher.getInstance(
                            "AES/GCM/NoPadding"
                    );

            GCMParameterSpec spec =
                    new GCMParameterSpec(
                            GCM_TAG_LENGTH,
                            iv
                    );

            cipher.init(
                    Cipher.ENCRYPT_MODE,
                    wrappingKey,
                    spec
            );

            return cipher.doFinal(
                    aesKeyBytes
            );

        } catch (Exception e) {

            throw new IllegalStateException(
                    "Failed to wrap AES key",
                    e
            );
        }
    }

    /**
     * AES-256-GCM decryption of the protected AES key.
     */
    private byte[] decryptAesKey(
            byte[] wrappedAesKey,
            SecretKey wrappingKey,
            byte[] iv)
            throws Exception {

        Cipher cipher =
                Cipher.getInstance(
                        "AES/GCM/NoPadding"
                );

        GCMParameterSpec spec =
                new GCMParameterSpec(
                        GCM_TAG_LENGTH,
                        iv
                );

        cipher.init(
                Cipher.DECRYPT_MODE,
                wrappingKey,
                spec
        );

        return cipher.doFinal(
                wrappedAesKey
        );
    }

    /**
     * Result of ML-KEM AES-key protection.
     */
    public record MlKemKeyProtectionResult(
            byte[] kemCiphertext,
            byte[] wrappedAesKey,
            byte[] wrapIv,
            String kemAlgorithm,
            String kdfAlgorithm,
            String wrappingAlgorithm
    ) {
    }
}