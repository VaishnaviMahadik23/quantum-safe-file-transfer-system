package com.quantumsafe.backend.crypto.aes;

import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class AesEncryptionServiceTest {

    private final AesEncryptionService aesEncryptionService =
            new AesEncryptionService();

    @Test
    void shouldEncryptAndDecryptSuccessfully() throws Exception {

        String originalText =
                "Quantum Safe File Transfer Test";

        byte[] originalData =
                originalText.getBytes(StandardCharsets.UTF_8);

        SecretKey key =
                aesEncryptionService.generateKey();

        AesEncryptionResult result =
                aesEncryptionService.encrypt(
                        originalData,
                        key
                );

        assertNotNull(result);
        assertNotNull(result.getEncryptedData());
        assertNotNull(result.getIv());

        assertEquals(
                256,
                result.getKeySize()
        );

        assertEquals(
                "AES-256-GCM",
                result.getAlgorithm()
        );

        assertEquals(
                12,
                result.getIv().length
        );

        byte[] decryptedData =
                aesEncryptionService.decrypt(
                        result.getEncryptedData(),
                        key,
                        result.getIv()
                );

        assertArrayEquals(
                originalData,
                decryptedData
        );
    }

    @Test
    void shouldGenerateDifferentIvForEachEncryption()
            throws Exception {

        byte[] data =
                "Test data".getBytes(StandardCharsets.UTF_8);

        SecretKey key =
                aesEncryptionService.generateKey();

        AesEncryptionResult result1 =
                aesEncryptionService.encrypt(data, key);

        AesEncryptionResult result2 =
                aesEncryptionService.encrypt(data, key);

        assertFalse(
                Arrays.equals(
                        result1.getIv(),
                        result2.getIv()
                )
        );
    }

    @Test
    void shouldFailWhenCiphertextIsTampered()
            throws Exception {

        byte[] data =
                "Sensitive quantum-safe data"
                        .getBytes(StandardCharsets.UTF_8);

        SecretKey key =
                aesEncryptionService.generateKey();

        AesEncryptionResult result =
                aesEncryptionService.encrypt(data, key);

        byte[] tamperedData =
                result.getEncryptedData().clone();

        tamperedData[0] ^= 1;

        assertThrows(
                Exception.class,
                () -> aesEncryptionService.decrypt(
                        tamperedData,
                        key,
                        result.getIv()
                )
        );
    }
}