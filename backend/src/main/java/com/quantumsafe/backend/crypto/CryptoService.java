package com.quantumsafe.backend.crypto;

import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

import java.security.SecureRandom;

import javax.crypto.spec.SecretKeySpec;
import java.security.KeyPair;
import java.security.KeyPairGenerator;

import java.security.PublicKey;
import javax.crypto.KEM;
import java.security.PrivateKey;

@Service
public class CryptoService {


    public String sha3_256(byte[] data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA3-256");

            byte[] hashBytes = digest.digest(data);

            StringBuilder hexString = new StringBuilder();

            for (byte b : hashBytes) {
                hexString.append(String.format("%02x", b));
            }

            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA3-256 algorithm not available", e);
        }
    }

    public byte[][] encryptAesGcm(byte[] data) {
    try {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
        keyGenerator.init(256);

        SecretKey aesKey = keyGenerator.generateKey();

        byte[] iv = new byte[12];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(iv);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

        GCMParameterSpec gcmSpec =
                new GCMParameterSpec(128, iv);

        cipher.init(
                Cipher.ENCRYPT_MODE,
                aesKey,
                gcmSpec
        );

        byte[] encryptedData = cipher.doFinal(data);

        return new byte[][]{
                encryptedData,
                aesKey.getEncoded(),
                iv
        };

        } catch (Exception e) {
            throw new RuntimeException(
                "AES-256-GCM encryption failed",
                e
            );
        }
    }
    public byte[] decryptAesGcm(
        byte[] encryptedData,
        byte[] aesKeyBytes,
        byte[] iv
        ) {
        try {
            SecretKey aesKey = new SecretKeySpec(
                    aesKeyBytes,
                    "AES"
            );
        
            Cipher cipher = Cipher.getInstance(
                    "AES/GCM/NoPadding"
            );
        
            GCMParameterSpec gcmSpec =
                    new GCMParameterSpec(128, iv);
        
            cipher.init(
                    Cipher.DECRYPT_MODE,
                    aesKey,
                    gcmSpec
            );
        
            return cipher.doFinal(encryptedData);
        
        } catch (Exception e) {
            throw new RuntimeException(
                    "AES-256-GCM decryption failed",
                    e
            );
        }
    }

    public KeyPair generateMlKem768KeyPair() {
        try {
            KeyPairGenerator keyPairGenerator =
                    KeyPairGenerator.getInstance("ML-KEM-768", "BC");

            return keyPairGenerator.generateKeyPair();

        } catch (Exception e) {
            throw new RuntimeException(
                    "ML-KEM-768 key pair generation failed",
                    e
            );
        }
    }

    public byte[][] encapsulateMlKem(PublicKey receiverPublicKey) {

        try {
            KEM kem = KEM.getInstance("ML-KEM", "BC");

            KEM.Encapsulator encapsulator =
                    kem.newEncapsulator(receiverPublicKey);

            KEM.Encapsulated encapsulated =
                    encapsulator.encapsulate();

            byte[] sharedSecret =
                    encapsulated.key().getEncoded();

            byte[] kemCiphertext =
                    encapsulated.encapsulation();

            return new byte[][]{
                    sharedSecret,
                    kemCiphertext
            };

        } catch (Exception e) {
            throw new RuntimeException(
                    "ML-KEM-768 encapsulation failed",
                    e
            );
        }
    }


    public byte[] decapsulateMlKem(
            PrivateKey receiverPrivateKey,
            byte[] kemCiphertext
        ) {
        try {
            KEM kem = KEM.getInstance("ML-KEM", "BC");

            KEM.Decapsulator decapsulator =
                    kem.newDecapsulator(receiverPrivateKey);

            SecretKey sharedSecret =
                    decapsulator.decapsulate(kemCiphertext);

            return sharedSecret.getEncoded();

        } catch (Exception e) {
            throw new RuntimeException(
                    "ML-KEM-768 decapsulation failed",
                    e
            );
        }
    }

}