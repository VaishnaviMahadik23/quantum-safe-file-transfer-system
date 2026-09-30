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


            @GetMapping("/api/crypto/key-wrap-test")
        public Map<String, Object> testKeyWrapping() {

            // 1. Create some test data and encrypt it with AES-256-GCM
            byte[][] aesResult = cryptoService.encryptAesGcm(
                    "hello quantum".getBytes(StandardCharsets.UTF_8)
            );

            byte[] encryptedData = aesResult[0];
            byte[] originalAesKey = aesResult[1];
            byte[] fileIv = aesResult[2];

            // 2. Generate receiver ML-KEM-768 key pair
            KeyPair receiverKeyPair =
                    cryptoService.generateMlKem768KeyPair();

            // 3. Sender performs ML-KEM encapsulation
            byte[][] kemResult =
                    cryptoService.encapsulateMlKem(
                            receiverKeyPair.getPublic()
                    );

            byte[] senderSharedSecret = kemResult[0];
            byte[] kemCiphertext = kemResult[1];

            // 4. Sender derives wrapping key using HKDF
            byte[] senderWrappingKey =
                    cryptoService.deriveWrappingKey(
                            senderSharedSecret
                    );

            // 5. Wrap the AES file key
            byte[][] wrappedResult =
                    cryptoService.wrapAesKey(
                            originalAesKey,
                            senderWrappingKey
                    );

            byte[] wrappedAesKey = wrappedResult[0];
            byte[] wrapIv = wrappedResult[1];

            // 6. Receiver decapsulates ML-KEM ciphertext
            byte[] receiverSharedSecret =
                    cryptoService.decapsulateMlKem(
                            receiverKeyPair.getPrivate(),
                            kemCiphertext
                    );

            // 7. Receiver derives the same wrapping key
            byte[] receiverWrappingKey =
                    cryptoService.deriveWrappingKey(
                            receiverSharedSecret
                    );

            // 8. Receiver unwraps the AES key
            byte[] recoveredAesKey =
                    cryptoService.unwrapAesKey(
                            wrappedAesKey,
                            receiverWrappingKey,
                            wrapIv
                    );

            // 9. Use recovered AES key to decrypt original data
            byte[] decryptedData =
                    cryptoService.decryptAesGcm(
                            encryptedData,
                            recoveredAesKey,
                            fileIv
                    );

            boolean sharedSecretsMatch =
                    Arrays.equals(
                            senderSharedSecret,
                            receiverSharedSecret
                    );

            boolean aesKeysMatch =
                    Arrays.equals(
                            originalAesKey,
                            recoveredAesKey
                    );

            Map<String, Object> response = new HashMap<>();

            response.put(
                    "sharedSecretsMatch",
                    sharedSecretsMatch
            );

            response.put(
                    "aesKeysMatch",
                    aesKeysMatch
            );

            response.put(
                    "decryptedText",
                    new String(
                            decryptedData,
                            StandardCharsets.UTF_8
                    )
            );

            return response;
        }

        @GetMapping("/api/crypto/hash-verify-test")
        public Map<String, Object> testHashVerification() {

            byte[] originalData =
                    "hello quantum".getBytes(StandardCharsets.UTF_8);

            // Generate hash of original data
            String originalHash =
                    cryptoService.sha3_256(originalData);

            // Verify original data
            boolean originalValid =
                    cryptoService.verifySha3_256(
                            originalData,
                            originalHash
                    );

            // Simulate someone modifying the data
            byte[] modifiedData =
                    "hello quantum modified"
                            .getBytes(StandardCharsets.UTF_8);

            // Verify modified data against original hash
            boolean modifiedValid =
                    cryptoService.verifySha3_256(
                            modifiedData,
                            originalHash
                    );

            Map<String, Object> response = new HashMap<>();

            response.put("originalValid", originalValid);
            response.put("modifiedValid", modifiedValid);
            response.put("hash", originalHash);

            return response;
        }
        

        @GetMapping("/api/crypto/mldsa-test")
        public Map<String, Object> testMlDsa() {

            // 1. Generate sender's ML-DSA-65 key pair
            KeyPair senderKeyPair =
                    cryptoService.generateMlDsa65KeyPair();

            // 2. Original test data
            byte[] originalData =
                    "hello quantum"
                            .getBytes(StandardCharsets.UTF_8);

            // 3. Sender signs using PRIVATE key
            byte[] digitalSignature =
                    cryptoService.signWithMlDsa(
                            originalData,
                            senderKeyPair.getPrivate()
                    );

            // 4. Receiver verifies using sender's PUBLIC key
            boolean originalValid =
                    cryptoService.verifyMlDsaSignature(
                            originalData,
                            digitalSignature,
                            senderKeyPair.getPublic()
                    );

            // 5. Simulate modified data
            byte[] modifiedData =
                    "hello quantum modified"
                            .getBytes(StandardCharsets.UTF_8);

            // 6. Try same signature on modified data
            boolean modifiedValid =
                    cryptoService.verifyMlDsaSignature(
                            modifiedData,
                    digitalSignature,
                    senderKeyPair.getPublic()
            );

            Map<String, Object> response = new HashMap<>();

            response.put("originalSignatureValid", originalValid);
            response.put("modifiedSignatureValid", modifiedValid);
            response.put("signatureLength", digitalSignature.length);

            return response;
        }
        
}