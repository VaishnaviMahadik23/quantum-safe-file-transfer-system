package com.quantumsafe.backend.crypto.mlkem;

import org.bouncycastle.crypto.AsymmetricCipherKeyPair;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPublicKeyParameters;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import java.security.SecureRandom;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class MlKemKeyProtectionServiceTest {

    @Test
    void shouldProtectAndRecoverAes256Key() throws Exception {

        /*
         * Create ML-KEM key pair.
         */
        MlKemKeyPairService keyPairService =
                new MlKemKeyPairService();

        MlKemKeyPairService.MlKemKeyPair keyPair =
                keyPairService.generateMlKemKeyPair();

        /*
         * Create ML-KEM encryption service.
         */
        MlKemEncryptionService encryptionService =
                new MlKemEncryptionService();

        /*
         * Create key protection service.
         */
        MlKemKeyProtectionService protectionService =
                new MlKemKeyProtectionService(
                        encryptionService
                );

        /*
         * Generate a random AES-256 key.
         */
        byte[] originalAesKeyBytes =
                new byte[32];

        new SecureRandom()
                .nextBytes(originalAesKeyBytes);

        SecretKey originalAesKey =
                new SecretKeySpec(
                        originalAesKeyBytes,
                        "AES"
                );

        /*
         * Protect the AES key.
         */
        MlKemKeyProtectionService
                .MlKemKeyProtectionResult result =
                protectionService.protect(
                        originalAesKey,
                        keyPair.publicKey()
                );

        assertNotNull(result);

        assertNotNull(
                result.kemCiphertext()
        );

        assertNotNull(
                result.wrappedAesKey()
        );

        assertNotNull(
                result.wrapIv()
        );

        /*
         * Verify algorithm metadata.
         */
        assertEquals(
                "ML-KEM-768",
                result.kemAlgorithm()
        );

        assertEquals(
                "HKDF-SHA-256",
                result.kdfAlgorithm()
        );

        assertEquals(
                "AES-256-GCM",
                result.wrappingAlgorithm()
        );

        /*
         * ML-KEM-768 ciphertext must not be empty.
         */
        assertTrue(
                result.kemCiphertext().length > 0
        );

        /*
         * AES-GCM IV should be 12 bytes.
         */
        assertEquals(
                12,
                result.wrapIv().length
        );

        /*
         * Recover AES key using
         * recipient's ML-KEM private key.
         */
        SecretKey recoveredAesKey =
                protectionService.unprotect(
                        result,
                        keyPair.privateKey()
                );

        assertNotNull(
                recoveredAesKey
        );

        /*
         * Verify that the recovered AES key
         * is exactly the original key.
         */
        assertArrayEquals(
                originalAesKey.getEncoded(),
                recoveredAesKey.getEncoded()
        );

        /*
         * Verify AES-256.
         */
        assertEquals(
                32,
                recoveredAesKey.getEncoded().length
        );
    }

    @Test
    void shouldProduceDifferentProtectionResultsForSameAesKey()
            throws Exception {

        MlKemKeyPairService keyPairService =
                new MlKemKeyPairService();

        MlKemKeyPairService.MlKemKeyPair keyPair =
                keyPairService.generateMlKemKeyPair();

        MlKemEncryptionService encryptionService =
                new MlKemEncryptionService();

        MlKemKeyProtectionService protectionService =
                new MlKemKeyProtectionService(
                        encryptionService
                );

        byte[] aesKeyBytes =
                new byte[32];

        new SecureRandom()
                .nextBytes(aesKeyBytes);

        SecretKey aesKey =
                new SecretKeySpec(
                        aesKeyBytes,
                        "AES"
                );

        /*
         * Protect the same AES key twice.
         */
        MlKemKeyProtectionService
                .MlKemKeyProtectionResult result1 =
                protectionService.protect(
                        aesKey,
                        keyPair.publicKey()
                );

        MlKemKeyProtectionService
                .MlKemKeyProtectionResult result2 =
                protectionService.protect(
                        aesKey,
                        keyPair.publicKey()
                );

        /*
         * Fresh ML-KEM encapsulation and
         * fresh AES-GCM IV should produce
         * different protected values.
         */
        assertFalse(
                Arrays.equals(
                        result1.kemCiphertext(),
                        result2.kemCiphertext()
                )
        );

        assertFalse(
                Arrays.equals(
                        result1.wrappedAesKey(),
                        result2.wrappedAesKey()
                )
        );

        assertFalse(
                Arrays.equals(
                        result1.wrapIv(),
                        result2.wrapIv()
                )
        );
    }

    @Test
    void shouldRejectWrongPrivateKey()
            throws Exception {

        MlKemKeyPairService keyPairService =
                new MlKemKeyPairService();

        MlKemKeyPairService.MlKemKeyPair
                senderRecipientKeyPair =
                keyPairService.generateMlKemKeyPair();

        MlKemKeyPairService.MlKemKeyPair
                wrongKeyPair =
                keyPairService.generateMlKemKeyPair();

        MlKemEncryptionService encryptionService =
                new MlKemEncryptionService();

        MlKemKeyProtectionService protectionService =
                new MlKemKeyProtectionService(
                        encryptionService
                );

        byte[] aesKeyBytes =
                new byte[32];

        new SecureRandom()
                .nextBytes(aesKeyBytes);

        SecretKey aesKey =
                new SecretKeySpec(
                        aesKeyBytes,
                        "AES"
                );

        /*
         * Protect using the correct public key.
         */
        MlKemKeyProtectionService
                .MlKemKeyProtectionResult result =
                protectionService.protect(
                        aesKey,
                        senderRecipientKeyPair.publicKey()
                );

        /*
         * Attempt recovery using a completely
         * different ML-KEM private key.
         *
         * This should fail authentication during
         * AES-GCM decryption.
         */
        assertThrows(
                Exception.class,
                () -> protectionService.unprotect(
                        result,
                        wrongKeyPair.privateKey()
                )
        );
    }

    @Test
    void shouldRejectNullAesKey() {

        MlKemKeyPairService keyPairService =
                new MlKemKeyPairService();

        MlKemKeyPairService.MlKemKeyPair keyPair =
                keyPairService.generateMlKemKeyPair();

        MlKemEncryptionService encryptionService =
                new MlKemEncryptionService();

        MlKemKeyProtectionService protectionService =
                new MlKemKeyProtectionService(
                        encryptionService
                );

        assertThrows(
                IllegalArgumentException.class,
                () -> protectionService.protect(
                        null,
                        keyPair.publicKey()
                )
        );
    }
}