package com.quantumsafe.backend.file.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
public class ReceivedFileResponse {

    private UUID transferId;
    private UUID fileId;
    private String fileName;
    private String contentType;
    private Long fileSize;

    private String senderUsername;

    private String status;

    private String encryptionAlgorithm;
    private String kemAlgorithm;
    private String signatureAlgorithm;

    private LocalDateTime createdAt;
}