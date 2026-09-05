package com.quantumsafe.backend.file.repository;

import com.quantumsafe.backend.file.entity.FileTransfer;
import com.quantumsafe.backend.file.entity.FileTransferStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FileTransferRepository
        extends JpaRepository<FileTransfer, UUID> {

    List<FileTransfer> findBySenderId(UUID senderId);

    List<FileTransfer> findByReceiverId(UUID receiverId);

    List<FileTransfer> findByStatus(FileTransferStatus status);
}