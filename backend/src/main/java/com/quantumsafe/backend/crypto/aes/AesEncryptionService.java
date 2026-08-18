package com.quantumsafe.backend.crypto.aes;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.security.SecureRandom;

@Service
public class AesEncryptionService {

    private static final int AES_KEY_SIZE = 256;

    private static final int GCM_IV_SIZE = 12;

    private static final int GCM_TAG_LENGTH = 128;

    private final SecureRandom secureRandom = new SecureRandom();

    /**
     * Generates a random AES-256 key.
     */
    public SecretKey generateKey() throws Exception {

        KeyGenerator keyGenerator =
                KeyGenerator.getInstance("AES");

        keyGenerator.init(AES_KEY_SIZE);

        return keyGenerator.generateKey();
    }

    /**
     * Generates a random 12-byte GCM IV.
     */
    public byte[] generateIv() {

        byte[] iv = new byte[GCM_IV_SIZE];

        secureRandom.nextBytes(iv);

        return iv;
    }

    /**
     * Encrypts data using AES-256-GCM.
     */
    public AesEncryptionResult encrypt(
            byte[] plainData,
            SecretKey secretKey
    ) throws Exception {

        if (plainData == null || plainData.length == 0) {
            throw new IllegalArgumentException(
                    "Data cannot be empty"
            );
        }

        if (secretKey == null) {
            throw new IllegalArgumentException(
                    "AES key cannot be null"
            );
        }

        byte[] iv = generateIv();

        GCMParameterSpec gcmParameterSpec =
                new GCMParameterSpec(
                        GCM_TAG_LENGTH,
                        iv
                );

        Cipher cipher =
                Cipher.getInstance("AES/GCM/NoPadding");

        cipher.init(
                Cipher.ENCRYPT_MODE,
                secretKey,
                gcmParameterSpec
        );

        byte[] encryptedData =
                cipher.doFinal(plainData);

        return new AesEncryptionResult(
                encryptedData,
                iv,
                AES_KEY_SIZE,
                "AES-256-GCM"
        );
    }

    /**
     * Decrypts AES-256-GCM encrypted data.
     */
    public byte[] decrypt(
            byte[] encryptedData,
            SecretKey secretKey,
            byte[] iv
    ) throws Exception {

        if (encryptedData == null
                || encryptedData.length == 0) {

            throw new IllegalArgumentException(
                    "Encrypted data cannot be empty"
            );
        }

        if (secretKey == null) {
            throw new IllegalArgumentException(
                    "AES key cannot be null"
            );
        }

        if (iv == null || iv.length != GCM_IV_SIZE) {
            throw new IllegalArgumentException(
                    "Invalid GCM IV"
            );
        }

        GCMParameterSpec gcmParameterSpec =
                new GCMParameterSpec(
                        GCM_TAG_LENGTH,
                        iv
                );

        Cipher cipher =
                Cipher.getInstance("AES/GCM/NoPadding");

        cipher.init(
                Cipher.DECRYPT_MODE,
                secretKey,
                gcmParameterSpec
        );

        return cipher.doFinal(encryptedData);
    }
}