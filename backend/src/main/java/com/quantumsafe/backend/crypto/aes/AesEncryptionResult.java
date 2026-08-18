package com.quantumsafe.backend.crypto.aes;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AesEncryptionResult {

    private final byte[] encryptedData;

    private final byte[] iv;

    private final int keySize;

    private final String algorithm;
}