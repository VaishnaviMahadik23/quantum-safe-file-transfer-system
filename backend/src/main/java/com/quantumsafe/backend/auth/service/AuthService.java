package com.quantumsafe.backend.auth.service;

import com.quantumsafe.backend.auth.dto.AuthResponse;
import com.quantumsafe.backend.auth.dto.LoginRequest;
import com.quantumsafe.backend.auth.dto.RegisterRequest;
import com.quantumsafe.backend.auth.entity.Role;
import com.quantumsafe.backend.auth.entity.User;
import com.quantumsafe.backend.auth.repository.UserRepository;
import com.quantumsafe.backend.auth.security.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;


    /**
     * Register a new user.
     */
    public AuthResponse register(RegisterRequest request) {

        // Check whether email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
                    "Email is already registered"
            );
        }

        // Check whether username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException(
                    "Username is already taken"
            );
        }

        // Create user
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(request.getPassword())
                )
                .role(Role.USER)
                .build();

        // Save user
        User savedUser = userRepository.save(user);

        // Generate JWT tokens
        String accessToken = jwtService.generateAccessToken(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getRole().name()
        );

        String refreshToken = jwtService.generateRefreshToken(
                savedUser.getId(),
                savedUser.getUsername()
        );

        return AuthResponse.builder()
                .userId(savedUser.getId())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .message("Registration successful")
                .build();
    }


    /**
     * Login existing user.
     */
    public AuthResponse login(LoginRequest request) {

        // Find user by email
        User user = userRepository.findByEmail(
                request.getEmail()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Invalid email or password"
                )
        );

        // Verify password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        // Generate access token
        String accessToken = jwtService.generateAccessToken(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

        // Generate refresh token
        String refreshToken = jwtService.generateRefreshToken(
                user.getId(),
                user.getUsername()
        );

        return AuthResponse.builder()
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .message("Login successful")
                .build();
    }
}