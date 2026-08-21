package com.quantumsafe.backend.crypto.kem;

import javax.crypto.KEM;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;

public class MlKemService {

    private static final String KEM_ALGORITHM = "ML-KEM";

    private static final String PARAMETER_SPEC = "ML-KEM-768";

    /**
     * Generates an ML-KEM-768 key pair.
     */
    public KeyPair generateKeyPair() throws Exception {

        KeyPairGenerator keyPairGenerator =
                KeyPairGenerator.getInstance(KEM_ALGORITHM);

        keyPairGenerator.initialize(
                new java.security.spec.NamedParameterSpec(
                        PARAMETER_SPEC
                ),
                new SecureRandom()
        );

        return keyPairGenerator.generateKeyPair();
    }

    /**
     * Encapsulates a shared secret using
     * the recipient's ML-KEM public key.
     */
    public EncapsulationResult encapsulate(
            PublicKey publicKey
    ) throws Exception {

        KEM kem = KEM.getInstance(KEM_ALGORITHM);

        KEM.Encapsulator encapsulator =
                kem.newEncapsulator(publicKey);

        KEM.Encapsulated encapsulated =
                encapsulator.encapsulate();

        return new EncapsulationResult(
                encapsulated.encapsulation(),
                encapsulated.key()
        );
    }

    /**
     * Decapsulates the shared secret using
     * the recipient's ML-KEM private key.
     */
    public byte[] decapsulate(
            PrivateKey privateKey,
            byte[] encapsulation
    ) throws Exception {

        KEM kem = KEM.getInstance(KEM_ALGORITHM);

        KEM.Decapsulator decapsulator =
                kem.newDecapsulator(privateKey);

        return decapsulator
                .decapsulate(encapsulation)
                .getEncoded();
    }

    /**
     * Result returned by ML-KEM encapsulation.
     */
    public record EncapsulationResult(
            byte[] encapsulation,
            javax.crypto.SecretKey key
    ) {
    }
}