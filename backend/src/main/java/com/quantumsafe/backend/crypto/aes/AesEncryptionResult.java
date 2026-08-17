package com.quantumsafe.backend.crypto.aes;

public record AesEncryptionResult(
        byte[] encryptedData,
        byte[] iv,
        byte[] key
) {
}