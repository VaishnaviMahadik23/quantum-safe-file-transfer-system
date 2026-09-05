package com.quantumsafe.backend.file.entity;

public enum FileTransferStatus {

    PENDING,
    ENCRYPTING,
    READY,
    DOWNLOADING,
    COMPLETED,
    FAILED,
    REJECTED
}