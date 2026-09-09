package com.quantumsafe.backend.crypto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import java.security.KeyPair;
import java.util.Arrays;


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

    @GetMapping("/api/crypto/mlkem-keypair")
    public Map<String, String> generateMlKemKeyPair() {

        KeyPair keyPair = cryptoService.generateMlKem768KeyPair();

        Map<String, String> response = new HashMap<>();

        response.put(
                "publicKey",
                Base64.getEncoder().encodeToString(
                        keyPair.getPublic().getEncoded()
                )
        );

        response.put(
                "privateKey",
                Base64.getEncoder().encodeToString(
                        keyPair.getPrivate().getEncoded()
                )
        );

        return response;
    }

    @GetMapping("/api/crypto/mlkem-encapsulate")
    public Map<String, String> testMlKemEncapsulation() {

        KeyPair keyPair =
                cryptoService.generateMlKem768KeyPair();

        byte[][] result =
                cryptoService.encapsulateMlKem(
                        keyPair.getPublic()
                );

        Map<String, String> response = new HashMap<>();

        response.put(
                "sharedSecret",
                Base64.getEncoder().encodeToString(result[0])
        );

        response.put(
                "kemCiphertext",
                Base64.getEncoder().encodeToString(result[1])
        );

        return response;
    }

    @GetMapping("/api/crypto/mlkem-test")
    public Map<String, Object> testMlKem() {
    
        // 1. Generate receiver's ML-KEM key pair
        KeyPair keyPair =
                cryptoService.generateMlKem768KeyPair();
    
        // 2. Encapsulate using receiver's public key
        byte[][] encapsulationResult =
                cryptoService.encapsulateMlKem(
                        keyPair.getPublic()
                );
            
        byte[] senderSharedSecret =
                encapsulationResult[0];
            
        byte[] kemCiphertext =
                encapsulationResult[1];
            
        // 3. Decapsulate using receiver's private key
        byte[] receiverSharedSecret =
                cryptoService.decapsulateMlKem(
                        keyPair.getPrivate(),
                        kemCiphertext
                );
            
        // 4. Compare both shared secrets
        boolean secretsMatch =
                Arrays.equals(
                        senderSharedSecret,
                        receiverSharedSecret
                );
            
        Map<String, Object> response = new HashMap<>();
            
        response.put("secretsMatch", secretsMatch);
        response.put("sharedSecretLength", senderSharedSecret.length);
        response.put("kemCiphertextLength", kemCiphertext.length);
            
        return response;
    }
}