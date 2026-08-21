package com.quantumsafe.backend.crypto.mlkem;

import lombok.RequiredArgsConstructor;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPrivateKeyParameters;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPublicKeyParameters;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class MlKemKeyManagementService {

    private final MlKemKeyPairService keyPairService =
            new MlKemKeyPairService();

    private final ConcurrentHashMap<
            String,
            MlKemKeyPairService.MlKemKeyPair
            > keyPairs = new ConcurrentHashMap<>();

    /**
     * Generates and registers a new ML-KEM-768 key pair.
     *
     * @return unique key identifier
     */
    public String generateKeyPair() {

        String keyId = UUID.randomUUID().toString();

        MlKemKeyPairService.MlKemKeyPair keyPair =
                keyPairService.generateMlKemKeyPair();

        keyPairs.put(keyId, keyPair);

        return keyId;
    }

    /**
     * Returns the public key associated with a key ID.
     */
    public MLKEMPublicKeyParameters getPublicKey(
            String keyId) {

        MlKemKeyPairService.MlKemKeyPair keyPair =
                getKeyPair(keyId);

        return keyPair.publicKey();
    }

    /**
     * Returns the private key associated with a key ID.
     *
     * This method will later be restricted to the
     * decryption/download workflow.
     */
    public MLKEMPrivateKeyParameters getPrivateKey(
            String keyId) {

        MlKemKeyPairService.MlKemKeyPair keyPair =
                getKeyPair(keyId);

        return keyPair.privateKey();
    }

    /**
     * Returns the complete key pair.
     */
    public MlKemKeyPairService.MlKemKeyPair getKeyPair(
            String keyId) {

        if (keyId == null || keyId.isBlank()) {
            throw new IllegalArgumentException(
                    "ML-KEM key ID cannot be null or empty"
            );
        }

        MlKemKeyPairService.MlKemKeyPair keyPair =
                keyPairs.get(keyId);

        if (keyPair == null) {
            throw new IllegalArgumentException(
                    "ML-KEM key pair not found for key ID: "
                            + keyId
            );
        }

        return keyPair;
    }

    /**
     * Checks whether a key ID exists.
     */
    public boolean exists(String keyId) {

        return keyId != null
                && !keyId.isBlank()
                && keyPairs.containsKey(keyId);
    }

    /**
     * Removes a key pair.
     *
     * This will mainly be useful later for
     * key rotation/revocation.
     */
    public void removeKeyPair(String keyId) {

        if (keyId == null || keyId.isBlank()) {
            throw new IllegalArgumentException(
                    "ML-KEM key ID cannot be null or empty"
            );
        }

        keyPairs.remove(keyId);
    }
}