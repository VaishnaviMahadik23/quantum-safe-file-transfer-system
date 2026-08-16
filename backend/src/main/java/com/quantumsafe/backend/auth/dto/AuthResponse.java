package com.quantumsafe.backend.auth.dto;

import com.quantumsafe.backend.auth.entity.Role;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class AuthResponse {

    private UUID userId;

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private Role role;

    private String accessToken;

    private String refreshToken;

    private String message;
}