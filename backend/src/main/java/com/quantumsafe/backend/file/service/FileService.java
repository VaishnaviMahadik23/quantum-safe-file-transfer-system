    package com.quantumsafe.backend.file.service;

    import com.quantumsafe.backend.auth.entity.User;
    import com.quantumsafe.backend.auth.repository.UserRepository;
import com.quantumsafe.backend.file.dto.FileDownloadResult;
import com.quantumsafe.backend.file.dto.FileUploadResponse;
    import com.quantumsafe.backend.file.dto.ReceivedFileResponse;

    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    import org.springframework.web.multipart.MultipartFile;

    import com.quantumsafe.backend.crypto.CryptoService;
    import com.quantumsafe.backend.key.service.UserCryptoKeyService;
    import java.security.PublicKey;
    import java.security.PrivateKey;
    import com.quantumsafe.backend.file.entity.FileMetadata;
    import com.quantumsafe.backend.file.repository.FileMetadataRepository;
    

    import com.quantumsafe.backend.file.entity.FileTransfer;
    import com.quantumsafe.backend.file.entity.FileTransferStatus;
    import com.quantumsafe.backend.file.repository.FileTransferRepository;
    import org.springframework.transaction.annotation.Transactional;
    import java.util.List;
    import java.util.UUID;
    


   


    @Service
    @RequiredArgsConstructor
    public class FileService {

        private final UserRepository userRepository;
        private final CryptoService cryptoService;
        private final UserCryptoKeyService userCryptoKeyService;
        private final FileMetadataRepository fileMetadataRepository;
        private final FileTransferRepository fileTransferRepository;

        @Transactional
        public FileUploadResponse sendFile(
                MultipartFile file,
                String recipientEmail,
                String message,
                String senderUsername
        ) {
            // Validate uploaded file
            if (file == null || file.isEmpty()) {
                throw new RuntimeException("Please select a file to upload");
            }

            long maxFileSize = 100L * 1024 * 1024; // 100 MB

            if (file.getSize() > maxFileSize) {
                throw new RuntimeException(
                        "File size exceeds the maximum allowed size of 100 MB"
                );
            }
            // 1. Find the authenticated sender
            User sender = userRepository
                    .findByUsername(senderUsername)
                    .orElseThrow(() ->
                            new RuntimeException("Sender not found")
                    );

            // 2. Find receiver using email entered in SendFile.jsx
            User receiver = userRepository
                    .findByEmail(recipientEmail)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Receiver not found with email: "
                                            + recipientEmail
                            )
                    );

            userCryptoKeyService.ensureKeysForUser(sender);
            userCryptoKeyService.ensureKeysForUser(receiver);

            byte[] originalFileData;

            try {
                originalFileData = file.getBytes();
            } catch (Exception e) {
                throw new RuntimeException(
                        "Failed to read uploaded file",
                        e
                );
            }

            String originalFileHash =
            cryptoService.sha3_256(originalFileData);
            // Encrypt the actual file using AES-256-GCM
            byte[][] aesResult =
                    cryptoService.encryptAesGcm(originalFileData);

            byte[] encryptedFileData = aesResult[0];
            byte[] aesKey = aesResult[1];
            byte[] fileIv = aesResult[2];

             // Generate SHA3-256 hash of encrypted file
            String encryptedFileHash =
            cryptoService.sha3_256(encryptedFileData);

            // Get receiver's persistent ML-KEM public key
        PublicKey receiverMlKemPublicKey =
                userCryptoKeyService.getMlKemPublicKey(receiver);

        // Perform ML-KEM-768 encapsulation
        byte[][] kemResult =
                cryptoService.encapsulateMlKem(receiverMlKemPublicKey);

        byte[] sharedSecret = kemResult[0];
        byte[] kemCiphertext = kemResult[1];

        // Derive a 256-bit AES wrapping key from the ML-KEM shared secret
        byte[] wrappingKey =
        cryptoService.deriveWrappingKey(sharedSecret);

        // Wrap the file's AES key using the derived wrapping key
        byte[][] wrapResult =
                cryptoService.wrapAesKey(aesKey, wrappingKey);

        byte[] wrappedAesKey = wrapResult[0];
        byte[] wrapIv = wrapResult[1];

        // Get sender's persistent ML-DSA private key
        PrivateKey senderMlDsaPrivateKey =
                userCryptoKeyService.getMlDsaPrivateKey(sender);

        // Digitally sign the encrypted file
        byte[] digitalSignature =
                cryptoService.signWithMlDsa(
                        encryptedFileData,
                        senderMlDsaPrivateKey
                );



        FileMetadata fileMetadata =
            FileMetadata.builder()
                .originalFileName(file.getOriginalFilename())
                .contentType(
                        file.getContentType() != null
                                ? file.getContentType()
                                : "application/octet-stream"
                )
                .fileSize(file.getSize())

                // Store encrypted file, NOT plaintext
                .fileData(encryptedFileData)

                // AES file encryption information
                .initializationVector(fileIv)
                .encryptionAlgorithm("AES-256-GCM")

                // ML-KEM + AES key wrapping information
                .kemCiphertext(kemCiphertext)
                .wrappedAesKey(wrappedAesKey)
                .wrapIv(wrapIv)
                .kemAlgorithm("ML-KEM-768")
                .kdfAlgorithm("HKDF-SHA-256")
                .wrappingAlgorithm("AES-256-GCM")

                // Sender's ML-DSA signature
                .digitalSignature(digitalSignature)
                .signatureAlgorithm("ML-DSA-65")

                // Sender owns the uploaded file
                .owner(sender)

                .build();

        fileMetadata = fileMetadataRepository.save(fileMetadata);

        FileTransfer fileTransfer =
        FileTransfer.builder()
                .originalFilename(file.getOriginalFilename())

                // Logical name/reference for the encrypted file
                .storedFilename(fileMetadata.getId() + ".enc")

                .fileSize(file.getSize())
                .contentType(
                        file.getContentType() != null
                                ? file.getContentType()
                                : "application/octet-stream"
                )

                .sender(sender)
                .receiver(receiver)

                // Link this transfer to encrypted FileMetadata
                .fileMetadata(fileMetadata)

                // Integrity hashes
                .originalFileHash(originalFileHash)
                .encryptedFileHash(encryptedFileHash)

                // Algorithms used
                .encryptionAlgorithm("AES-256-GCM")
                .kemAlgorithm("ML-KEM-768")
                .signatureAlgorithm("ML-DSA-65")

                // Encryption process is complete
                .status(FileTransferStatus.READY)

                .build();

        fileTransfer =
                fileTransferRepository.save(fileTransfer);


            
            // Crypto + database saving will be added in later steps.
            return FileUploadResponse.builder()
                .fileId(fileMetadata.getId())
                .fileName(fileMetadata.getOriginalFileName())
                .contentType(fileMetadata.getContentType())
                .fileSize(fileMetadata.getFileSize())
                .uploadedAt(fileMetadata.getUploadedAt())
                .message("File encrypted and sent successfully")
                .build();
        }


        @Transactional(readOnly = true)
        public List<ReceivedFileResponse> getReceivedFiles(String receiverUsername) {

        User receiver = userRepository.findByUsername(receiverUsername)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

                return fileTransferRepository.findByReceiverId(receiver.getId())
            .stream()
            .map(transfer -> ReceivedFileResponse.builder()
                    .transferId(transfer.getId())
                    .fileId(transfer.getFileMetadata().getId())
                    .fileName(transfer.getOriginalFilename())
                    .contentType(transfer.getContentType())
                    .fileSize(transfer.getFileSize())
                    .senderUsername(transfer.getSender().getUsername())
                    .status(transfer.getStatus().name())
                    .encryptionAlgorithm(transfer.getEncryptionAlgorithm())
                    .kemAlgorithm(transfer.getKemAlgorithm())
                    .signatureAlgorithm(transfer.getSignatureAlgorithm())
                    .createdAt(transfer.getCreatedAt())
                    .build())
            .toList();
        }

        @Transactional(readOnly = true)
        public FileDownloadResult getTransferForDownload(
                UUID transferId,
                String receiverUsername) {
                
            User receiver = userRepository.findByUsername(receiverUsername)
                    .orElseThrow(() -> new RuntimeException("Receiver not found"));
                
            FileTransfer transfer = fileTransferRepository.findById(transferId)
                    .orElseThrow(() -> new RuntimeException("File transfer not found"));
                
            // Security check: only intended receiver can download
            if (!transfer.getReceiver().getId().equals(receiver.getId())) {
                throw new RuntimeException(
                        "You are not authorized to download this file"
                );
            }
        
            if (transfer.getStatus() != FileTransferStatus.READY) {
                throw new RuntimeException(
                        "File is not ready for download"
                );
            }

            FileMetadata fileMetadata = transfer.getFileMetadata();

                // Load receiver's encrypted ML-KEM private key,
                // decrypt it using the server-side key protection service,
                // and reconstruct the PrivateKey object.
                PrivateKey receiverPrivateKey =
                        userCryptoKeyService.getMlKemPrivateKey(receiver);

                // Decapsulate the stored ML-KEM ciphertext.
                byte[] sharedSecret = cryptoService.decapsulateMlKem(
                        receiverPrivateKey,
                        fileMetadata.getKemCiphertext()
                );
                // STEP 70: Derive the AES wrapping key using HKDF-SHA-256
                byte[] wrappingKey =
                        cryptoService.deriveWrappingKey(sharedSecret);
                // STEP 71: Unwrap the original AES file-encryption key
                byte[] aesKey = cryptoService.unwrapAesKey(
                        fileMetadata.getWrappedAesKey(),
                        wrappingKey,
                        fileMetadata.getWrapIv()
                );

                // STEP 72: Decrypt the encrypted file using AES-256-GCM
                byte[] decryptedFileData = cryptoService.decryptAesGcm(
                        fileMetadata.getFileData(),
                        aesKey,
                        fileMetadata.getInitializationVector()
                );

                // STEP 73: Verify decrypted file integrity using SHA3-256
                String decryptedFileHash =
                        cryptoService.sha3_256(decryptedFileData);

                if (!decryptedFileHash.equals(transfer.getOriginalFileHash())) {
                    throw new RuntimeException(
                            "File integrity verification failed"
                    );
                }

                // STEP 74: Verify sender's ML-DSA-65 digital signature

                PublicKey senderPublicKey =
                        userCryptoKeyService.getMlDsaPublicKey(
                                transfer.getSender()
                        );
                
                boolean signatureValid =
                        cryptoService.verifyMlDsaSignature(
                                fileMetadata.getFileData(),
                                fileMetadata.getDigitalSignature(),
                                senderPublicKey
                        );
                
                if (!signatureValid) {
                    throw new RuntimeException(
                            "Digital signature verification failed"
                    );
                }

                return new FileDownloadResult(
                decryptedFileData,
                transfer.getOriginalFilename(),
                transfer.getContentType()
                );
        }
    }