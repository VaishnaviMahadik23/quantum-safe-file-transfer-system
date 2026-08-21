package com.quantumsafe.backend.crypto.mlkem;

import org.bouncycastle.crypto.AsymmetricCipherKeyPair;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMKeyGenerationParameters;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMKeyPairGenerator;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMParameters;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPrivateKeyParameters;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPublicKeyParameters;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class MlKemKeyPairService {

    private final SecureRandom secureRandom;

    public MlKemKeyPairService() {
        this.secureRandom = new SecureRandom();
    }

    /**
     * Generates an ML-KEM-768 key pair.
     *
     * ML-KEM-768 is the post-quantum KEM parameter
     * set used by this project.
     */
    public AsymmetricCipherKeyPair generateKeyPair() {

        MLKEMKeyPairGenerator generator =
                new MLKEMKeyPairGenerator();

        generator.init(
                new MLKEMKeyGenerationParameters(
                        secureRandom,
                        MLKEMParameters.ml_kem_768
                )
        );

        return generator.generateKeyPair();
    }

    /**
     * Generates an ML-KEM-768 key pair and returns
     * strongly typed public/private key parameters.
     */
    public MlKemKeyPair generateMlKemKeyPair() {

        AsymmetricCipherKeyPair keyPair =
                generateKeyPair();

        MLKEMPublicKeyParameters publicKey =
                (MLKEMPublicKeyParameters) keyPair.getPublic();

        MLKEMPrivateKeyParameters privateKey =
                (MLKEMPrivateKeyParameters) keyPair.getPrivate();

        return new MlKemKeyPair(
                publicKey,
                privateKey
        );
    }

    /**
     * Container for an ML-KEM public/private key pair.
     */
    public record MlKemKeyPair(
            MLKEMPublicKeyParameters publicKey,
            MLKEMPrivateKeyParameters privateKey
    ) {
    }
}