package com.quantumsafe.backend.file.repository;

import com.quantumsafe.backend.file.entity.FileMetadata;
import com.quantumsafe.backend.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FileMetadataRepository
        extends JpaRepository<FileMetadata, UUID> {

    List<FileMetadata> findByOwner(User owner);

    List<FileMetadata> findByOwnerId(UUID ownerId);
}