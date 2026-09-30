package com.quantumsafe.backend.key.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class KeyEncryptionService {

    private static final int IV_LENGTH = 12;
    private static final int GCM_TAG_LENGTH = 128;

    private final SecretKeySpec masterKey;
    private final SecureRandom secureRandom = new SecureRandom();

    public KeyEncryptionService(
            @Value("${key-management.encryption-secret}")
            String encryptionSecret
    ) {

        byte[] keyBytes =
                Base64.getDecoder().decode(encryptionSecret);

        if (keyBytes.length != 32) {
            throw new IllegalArgumentException(
                    "KEY_ENCRYPTION_SECRET must be exactly 32 bytes"
            );
        }

        this.masterKey =
                new SecretKeySpec(keyBytes, "AES");
    }

    public byte[][] encryptPrivateKey(byte[] privateKeyBytes) {

        try {

            byte[] iv = new byte[IV_LENGTH];
            secureRandom.nextBytes(iv);

            Cipher cipher =
                    Cipher.getInstance("AES/GCM/NoPadding");

            GCMParameterSpec gcmSpec =
                    new GCMParameterSpec(GCM_TAG_LENGTH, iv);

            cipher.init(
                    Cipher.ENCRYPT_MODE,
                    masterKey,
                    gcmSpec
            );

            byte[] encryptedPrivateKey =
                    cipher.doFinal(privateKeyBytes);

            return new byte[][]{
                    encryptedPrivateKey,
                    iv
            };

        } catch (Exception e) {
            throw new RuntimeException(
                    "Private key encryption failed",
                    e
            );
        }
    }

    public byte[] decryptPrivateKey(
            byte[] encryptedPrivateKey,
            byte[] iv
    ) {

        try {

            Cipher cipher =
                    Cipher.getInstance("AES/GCM/NoPadding");

            GCMParameterSpec gcmSpec =
                    new GCMParameterSpec(GCM_TAG_LENGTH, iv);

            cipher.init(
                    Cipher.DECRYPT_MODE,
                    masterKey,
                    gcmSpec
            );

            return cipher.doFinal(encryptedPrivateKey);

        } catch (Exception e) {
            throw new RuntimeException(
                    "Private key decryption failed",
                    e
            );
        }
    }
}