package com.quantumsafe.backend.key.repository;

import com.quantumsafe.backend.key.entity.UserCryptoKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserCryptoKeyRepository
        extends JpaRepository<UserCryptoKey, UUID> {

    Optional<UserCryptoKey> findByUserId(UUID userId);

    boolean existsByUserId(UUID userId);
}