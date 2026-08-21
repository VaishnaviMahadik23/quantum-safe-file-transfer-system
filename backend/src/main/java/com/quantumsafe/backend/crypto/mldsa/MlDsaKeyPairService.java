package com.quantumsafe.backend.crypto.mldsa;

import org.bouncycastle.crypto.AsymmetricCipherKeyPair;
import org.bouncycastle.pqc.crypto.mldsa.MLDSAKeyGenerationParameters;
import org.bouncycastle.pqc.crypto.mldsa.MLDSAKeyPairGenerator;
import org.bouncycastle.pqc.crypto.mldsa.MLDSAParameters;
import org.bouncycastle.pqc.crypto.mldsa.MLDSAPrivateKeyParameters;
import org.bouncycastle.pqc.crypto.mldsa.MLDSAPublicKeyParameters;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class MlDsaKeyPairService {

    private final SecureRandom secureRandom;

    public MlDsaKeyPairService() {
        this.secureRandom = new SecureRandom();
    }

    /**
     * Generates an ML-DSA-65 key pair.
     *
     * ML-DSA-65 is the NIST-standardized
     * post-quantum digital signature parameter set
     * used by this project.
     */
    public AsymmetricCipherKeyPair generateKeyPair() {

        MLDSAKeyPairGenerator generator =
                new MLDSAKeyPairGenerator();

        MLDSAKeyGenerationParameters parameters =
                new MLDSAKeyGenerationParameters(
                        secureRandom,
                        MLDSAParameters.ml_dsa_65
                );

        generator.init(parameters);

        return generator.generateKeyPair();
    }

    /**
     * Generates an ML-DSA-65 key pair and returns
     * strongly typed public/private key parameters.
     */
    public MlDsaKeyPair generateMlDsaKeyPair() {

        AsymmetricCipherKeyPair keyPair =
                generateKeyPair();

        MLDSAPublicKeyParameters publicKey =
                (MLDSAPublicKeyParameters)
                        keyPair.getPublic();

        MLDSAPrivateKeyParameters privateKey =
                (MLDSAPrivateKeyParameters)
                        keyPair.getPrivate();

        return new MlDsaKeyPair(
                publicKey,
                privateKey
        );
    }

    /**
     * Container for an ML-DSA public/private key pair.
     */
    public record MlDsaKeyPair(
            MLDSAPublicKeyParameters publicKey,
            MLDSAPrivateKeyParameters privateKey
    ) {
    }
}