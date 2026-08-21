package com.quantumsafe.backend.crypto.mlkem;

import org.bouncycastle.pqc.crypto.mlkem.MLKEMPrivateKeyParameters;
import org.bouncycastle.pqc.crypto.mlkem.MLKEMPublicKeyParameters;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MlKemKeyManagementServiceTest {

    @Test
    void shouldGenerateAndRetrieveMlKemKeyPair() {

        MlKemKeyManagementService service =
                new MlKemKeyManagementService();

        String keyId =
                service.generateKeyPair();

        assertNotNull(keyId);
        assertFalse(keyId.isBlank());

        assertTrue(
                service.exists(keyId)
        );

        MLKEMPublicKeyParameters publicKey =
                service.getPublicKey(keyId);

        MLKEMPrivateKeyParameters privateKey =
                service.getPrivateKey(keyId);

        assertNotNull(publicKey);
        assertNotNull(privateKey);
    }

    @Test
    void shouldReturnSameKeyPairForSameKeyId() {

        MlKemKeyManagementService service =
                new MlKemKeyManagementService();

        String keyId =
                service.generateKeyPair();

        MLKEMPublicKeyParameters publicKey1 =
                service.getPublicKey(keyId);

        MLKEMPublicKeyParameters publicKey2 =
                service.getPublicKey(keyId);

        assertArrayEquals(
                publicKey1.getEncoded(),
                publicKey2.getEncoded()
        );
    }

    @Test
    void shouldGenerateDifferentKeyIds() {

        MlKemKeyManagementService service =
                new MlKemKeyManagementService();

        String keyId1 =
                service.generateKeyPair();

        String keyId2 =
                service.generateKeyPair();

        assertNotEquals(
                keyId1,
                keyId2
        );

        assertTrue(
                service.exists(keyId1)
        );

        assertTrue(
                service.exists(keyId2)
        );
    }

    @Test
    void shouldRejectUnknownKeyId() {

        MlKemKeyManagementService service =
                new MlKemKeyManagementService();

        assertThrows(
                IllegalArgumentException.class,
                () -> service.getPublicKey(
                        "unknown-key-id"
                )
        );
    }

    @Test
    void shouldRemoveKeyPair() {

        MlKemKeyManagementService service =
                new MlKemKeyManagementService();

        String keyId =
                service.generateKeyPair();

        assertTrue(
                service.exists(keyId)
        );

        service.removeKeyPair(keyId);

        assertFalse(
                service.exists(keyId)
        );

        assertThrows(
                IllegalArgumentException.class,
                () -> service.getPrivateKey(keyId)
        );
    }
}