package com.quantumsafe.backend.key.service;

import com.quantumsafe.backend.auth.entity.User;
import com.quantumsafe.backend.crypto.CryptoService;
import com.quantumsafe.backend.key.entity.UserCryptoKey;
import com.quantumsafe.backend.key.repository.UserCryptoKeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.KeyPair;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

@Service
@RequiredArgsConstructor
public class UserCryptoKeyService {

    private final UserCryptoKeyRepository userCryptoKeyRepository;
    private final CryptoService cryptoService;
    private final KeyEncryptionService keyEncryptionService;

    public UserCryptoKey generateKeysForUser(User user) {

        // Do not generate another key set if user already has one
        if (userCryptoKeyRepository.existsByUserId(user.getId())) {
            throw new RuntimeException(
                    "Cryptographic keys already exist for this user"
            );
        }

        // Generate persistent ML-KEM-768 key pair
        KeyPair mlKemKeyPair =
                cryptoService.generateMlKem768KeyPair();

        // Generate persistent ML-DSA-65 key pair
        KeyPair mlDsaKeyPair =
                cryptoService.generateMlDsa65KeyPair();

        // Encrypt ML-KEM private key
        byte[][] encryptedMlKemPrivateKey =
                keyEncryptionService.encryptPrivateKey(
                        mlKemKeyPair.getPrivate().getEncoded()
                );

        // Encrypt ML-DSA private key separately
        byte[][] encryptedMlDsaPrivateKey =
                keyEncryptionService.encryptPrivateKey(
                        mlDsaKeyPair.getPrivate().getEncoded()
                );

        UserCryptoKey userCryptoKey =
                UserCryptoKey.builder()

                        .user(user)

                        .mlKemPublicKey(
                                mlKemKeyPair
                                        .getPublic()
                                        .getEncoded()
                        )

                        .mlKemPrivateKeyEncrypted(
                                encryptedMlKemPrivateKey[0]
                        )

                        .mlKemPrivateKeyIv(
                                encryptedMlKemPrivateKey[1]
                        )

                        .mlDsaPublicKey(
                                mlDsaKeyPair
                                        .getPublic()
                                        .getEncoded()
                        )

                        .mlDsaPrivateKeyEncrypted(
                                encryptedMlDsaPrivateKey[0]
                        )

                        .mlDsaPrivateKeyIv(
                                encryptedMlDsaPrivateKey[1]
                        )

                        .build();

        return userCryptoKeyRepository.save(userCryptoKey);
    }

    public UserCryptoKey ensureKeysForUser(User user) {

    return userCryptoKeyRepository
            .findByUserId(user.getId())
            .orElseGet(() ->
                    generateKeysForUser(user)
            );
}

    public PublicKey getMlKemPublicKey(User user) {

    try {
        UserCryptoKey userCryptoKey =
                userCryptoKeyRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Cryptographic keys not found for user"
                                )
                        );

        byte[] publicKeyBytes =
                userCryptoKey.getMlKemPublicKey();

        KeyFactory keyFactory =
                KeyFactory.getInstance("ML-KEM-768", "BC");

        return keyFactory.generatePublic(
                new X509EncodedKeySpec(publicKeyBytes)
        );

    } catch (Exception e) {
        throw new RuntimeException(
                "Failed to load ML-KEM public key",
                e
        );
    }
}

public PrivateKey getMlKemPrivateKey(User user) {

    try {
        UserCryptoKey userCryptoKey =
                userCryptoKeyRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Cryptographic keys not found for user"
                                )
                        );

        byte[] privateKeyBytes =
                keyEncryptionService.decryptPrivateKey(
                        userCryptoKey.getMlKemPrivateKeyEncrypted(),
                        userCryptoKey.getMlKemPrivateKeyIv()
                );

        KeyFactory keyFactory =
                KeyFactory.getInstance("ML-KEM-768", "BC");

        return keyFactory.generatePrivate(
                new PKCS8EncodedKeySpec(privateKeyBytes)
        );

    } catch (Exception e) {
        throw new RuntimeException(
                "Failed to load ML-KEM private key",
                e
        );
    }
}

    public PublicKey getMlDsaPublicKey(User user) {

    try {
        UserCryptoKey userCryptoKey =
                userCryptoKeyRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Cryptographic keys not found for user"
                                )
                        );

        byte[] publicKeyBytes =
                userCryptoKey.getMlDsaPublicKey();

        KeyFactory keyFactory =
                KeyFactory.getInstance("ML-DSA-65", "BC");

        return keyFactory.generatePublic(
                new X509EncodedKeySpec(publicKeyBytes)
        );

    } catch (Exception e) {
        throw new RuntimeException(
                "Failed to load ML-DSA public key",
                e
        );
    }
}

    public PrivateKey getMlDsaPrivateKey(User user) {

    try {
        UserCryptoKey userCryptoKey =
                userCryptoKeyRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Cryptographic keys not found for user"
                                )
                        );

        byte[] privateKeyBytes =
                keyEncryptionService.decryptPrivateKey(
                        userCryptoKey.getMlDsaPrivateKeyEncrypted(),
                        userCryptoKey.getMlDsaPrivateKeyIv()
                );

        KeyFactory keyFactory =
                KeyFactory.getInstance("ML-DSA-65", "BC");

        return keyFactory.generatePrivate(
                new PKCS8EncodedKeySpec(privateKeyBytes)
        );

    } catch (Exception e) {
        throw new RuntimeException(
                "Failed to load ML-DSA private key",
                e
        );
    }
}

}