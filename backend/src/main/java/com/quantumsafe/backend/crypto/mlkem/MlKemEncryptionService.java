package com.quantumsafe.backend.crypto.mlkem;

import org.bouncycastle.crypto.SecretWithEncapsulation;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMExtractor;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMGenerator;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPrivateKeyParameters;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPublicKeyParameters;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Arrays;

@Service
public class MlKemEncryptionService {

    private static final int ML_KEM_768_SHARED_SECRET_LENGTH = 32;

    private final SecureRandom secureRandom;

    public MlKemEncryptionService() {
        this.secureRandom = new SecureRandom();
    }

    /**
     * Performs ML-KEM-768 encapsulation.
     *
     * The recipient's public key is used to generate:
     *
     * 1. A ciphertext
     * 2. A shared secret
     */
    public MlKemEncapsulationResult encapsulate(
            MLKEMPublicKeyParameters publicKey) {

        if (publicKey == null) {
            throw new IllegalArgumentException(
                    "ML-KEM public key cannot be null"
            );
        }

        MLKEMGenerator generator =
                new MLKEMGenerator(secureRandom);

        SecretWithEncapsulation result =
                generator.generateEncapsulated(publicKey);

        byte[] sharedSecret =
                result.getSecret();

        byte[] ciphertext =
                result.getEncapsulation();

        if (sharedSecret.length
                != ML_KEM_768_SHARED_SECRET_LENGTH) {

            throw new IllegalStateException(
                    "Unexpected ML-KEM-768 shared secret length: "
                            + sharedSecret.length
            );
        }

        return new MlKemEncapsulationResult(
                ciphertext,
                sharedSecret
        );
    }

    /**
     * Performs ML-KEM-768 decapsulation.
     *
     * The recipient's private key is used to recover
     * the same shared secret generated during encapsulation.
     */
    public byte[] decapsulate(
            MLKEMPrivateKeyParameters privateKey,
            byte[] ciphertext) {

        if (privateKey == null) {
            throw new IllegalArgumentException(
                    "ML-KEM private key cannot be null"
            );
        }

        if (ciphertext == null || ciphertext.length == 0) {
            throw new IllegalArgumentException(
                    "ML-KEM ciphertext cannot be null or empty"
            );
        }

        MLKEMExtractor extractor =
                new MLKEMExtractor(privateKey);

        return extractor.extractSecret(ciphertext);
    }

    /**
     * Performs a complete ML-KEM-768 round trip:
     *
     * Public Key
     *      ↓
     * Encapsulation
     *      ↓
     * Ciphertext + Shared Secret
     *      ↓
     * Decapsulation
     *      ↓
     * Same Shared Secret
     */
    public MlKemRoundTripResult performRoundTrip(
            MlKemKeyPairService.MlKemKeyPair keyPair) {

        if (keyPair == null) {
            throw new IllegalArgumentException(
                    "ML-KEM key pair cannot be null"
            );
        }

        MlKemEncapsulationResult encapsulation =
                encapsulate(keyPair.publicKey());

        byte[] recoveredSecret =
                decapsulate(
                        keyPair.privateKey(),
                        encapsulation.ciphertext()
                );

        boolean sharedSecretsMatch =
                Arrays.equals(
                        encapsulation.sharedSecret(),
                        recoveredSecret
                );

        return new MlKemRoundTripResult(
                encapsulation.ciphertext(),
                encapsulation.sharedSecret(),
                recoveredSecret,
                sharedSecretsMatch
        );
    }

    /**
     * Result produced by ML-KEM encapsulation.
     */
    public record MlKemEncapsulationResult(
            byte[] ciphertext,
            byte[] sharedSecret
    ) {
    }

    /**
     * Result of a complete encapsulation/decapsulation
     * verification.
     */
    public record MlKemRoundTripResult(
            byte[] ciphertext,
            byte[] encapsulatedSharedSecret,
            byte[] decapsulatedSharedSecret,
            boolean sharedSecretsMatch
    ) {
    }
}