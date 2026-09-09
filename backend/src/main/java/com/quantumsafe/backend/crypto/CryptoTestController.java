package com.quantumsafe.backend.crypto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
public class CryptoTestController {

    private final CryptoService cryptoService;

    public CryptoTestController(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    @GetMapping("/api/crypto/hash")
    public String hash(@RequestParam String text) {

        return cryptoService.sha3_256(
                text.getBytes(StandardCharsets.UTF_8)
        );
    }
    

    @GetMapping("/api/crypto/encrypt")
    public Map<String, String> encrypt(@RequestParam String text) {

        byte[][] result = cryptoService.encryptAesGcm(
                text.getBytes(StandardCharsets.UTF_8)
        );

        Map<String, String> response = new HashMap<>();

        response.put(
                "encryptedData",
                Base64.getEncoder().encodeToString(result[0])
        );

        response.put(
                "aesKey",
                Base64.getEncoder().encodeToString(result[1])
        );

        response.put(
                "iv",
                Base64.getEncoder().encodeToString(result[2])
        );

        return response;
    }
    
    
    @GetMapping("/api/crypto/decrypt")
    public String decrypt(
            @RequestParam String encryptedData,
            @RequestParam String aesKey,
            @RequestParam String iv
    ) {
    
        byte[] encryptedBytes =
                Base64.getDecoder().decode(encryptedData);
    
        byte[] keyBytes =
                Base64.getDecoder().decode(aesKey);
    
        byte[] ivBytes =
                Base64.getDecoder().decode(iv);
    
        byte[] decryptedBytes =
                cryptoService.decryptAesGcm(
                        encryptedBytes,
                        keyBytes,
                        ivBytes
                );
            
        return new String(
                decryptedBytes,
                StandardCharsets.UTF_8
        );
    }
}