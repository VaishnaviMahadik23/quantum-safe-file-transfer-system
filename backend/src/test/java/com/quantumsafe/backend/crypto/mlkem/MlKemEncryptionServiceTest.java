package com.quantumsafe.backend.crypto.mlkem;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class MlKemEncryptionServiceTest {

    @Test
    void mlKem768EncapsulationAndDecapsulationShouldProduceSameSharedSecret() {

        // Arrange
        MlKemKeyPairService keyPairService =
                new MlKemKeyPairService();

        MlKemEncryptionService encryptionService =
                new MlKemEncryptionService();

        MlKemKeyPairService.MlKemKeyPair keyPair =
                keyPairService.generateMlKemKeyPair();

        // Act
        MlKemEncryptionService.MlKemEncapsulationResult encapsulation =
                encryptionService.encapsulate(
                        keyPair.publicKey()
                );

        byte[] recoveredSecret =
                encryptionService.decapsulate(
                        keyPair.privateKey(),
                        encapsulation.ciphertext()
                );

        // Assert
        assertNotNull(
                encapsulation.ciphertext(),
                "ML-KEM ciphertext must not be null"
        );

        assertNotNull(
                encapsulation.sharedSecret(),
                "ML-KEM shared secret must not be null"
        );

        assertNotNull(
                recoveredSecret,
                "Recovered shared secret must not be null"
        );

        assertEquals(
                32,
                encapsulation.sharedSecret().length,
                "ML-KEM shared secret must be 32 bytes"
        );

        assertArrayEquals(
                encapsulation.sharedSecret(),
                recoveredSecret,
                "Encapsulated and decapsulated shared secrets must match"
        );
    }

    @Test
    void mlKem768RoundTripShouldBeSuccessful() {

        // Arrange
        MlKemKeyPairService keyPairService =
                new MlKemKeyPairService();

        MlKemEncryptionService encryptionService =
                new MlKemEncryptionService();

        MlKemKeyPairService.MlKemKeyPair keyPair =
                keyPairService.generateMlKemKeyPair();

        // Act
        MlKemEncryptionService.MlKemRoundTripResult result =
                encryptionService.performRoundTrip(keyPair);

        // Assert
        assertTrue(
                result.sharedSecretsMatch(),
                "ML-KEM-768 round trip must produce matching shared secrets"
        );

        assertNotNull(
                result.ciphertext(),
                "ML-KEM ciphertext must not be null"
        );

        assertNotNull(
                result.encapsulatedSharedSecret(),
                "Encapsulated shared secret must not be null"
        );

        assertNotNull(
                result.decapsulatedSharedSecret(),
                "Decapsulated shared secret must not be null"
        );

        assertArrayEquals(
                result.encapsulatedSharedSecret(),
                result.decapsulatedSharedSecret()
        );
    }

    @Test
    void mlKem768ShouldGenerateDifferentCiphertextsForDifferentEncapsulations() {

        // Arrange
        MlKemKeyPairService keyPairService =
                new MlKemKeyPairService();

        MlKemEncryptionService encryptionService =
                new MlKemEncryptionService();

        MlKemKeyPairService.MlKemKeyPair keyPair =
                keyPairService.generateMlKemKeyPair();

        // Act
        MlKemEncryptionService.MlKemEncapsulationResult first =
                encryptionService.encapsulate(
                        keyPair.publicKey()
                );

        MlKemEncryptionService.MlKemEncapsulationResult second =
                encryptionService.encapsulate(
                        keyPair.publicKey()
                );

        // Assert
        assertFalse(
                Arrays.equals(
                        first.ciphertext(),
                        second.ciphertext()
                ),
                "Independent ML-KEM encapsulations should produce different ciphertexts"
        );

        assertFalse(
                Arrays.equals(
                        first.sharedSecret(),
                        second.sharedSecret()
                ),
                "Independent ML-KEM encapsulations should produce different shared secrets"
        );
    }
}