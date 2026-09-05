package com.quantumsafe.backend.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        System.out.println();
        System.out.println("========== JWT FILTER ==========");
        System.out.println("Request: " + request.getMethod() + " " + request.getRequestURI());

        final String authorizationHeader =
                request.getHeader("Authorization");

        System.out.println("Authorization Header Present: "
                + (authorizationHeader != null));

        String username = null;
        String jwt = null;

        if (authorizationHeader != null
                && authorizationHeader.startsWith("Bearer ")) {

            jwt = authorizationHeader.substring(7);

            System.out.println("Bearer token detected");
            System.out.println("Token length: " + jwt.length());

            try {

                username = jwtService.extractUsername(jwt);

                System.out.println("JWT username: " + username);

            } catch (Exception e) {

                System.out.println("JWT extraction FAILED");
                System.out.println("Reason: " + e.getMessage());
            }
        } else {

            System.out.println("No valid Bearer token found");
        }

        if (username != null
                && SecurityContextHolder
                .getContext()
                .getAuthentication() == null) {

            try {

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                System.out.println(
                        "User loaded: " + userDetails.getUsername()
                );

                boolean valid =
                        jwtService.isTokenValid(
                                jwt,
                                userDetails.getUsername()
                        );

                System.out.println("JWT valid: " + valid);

                if (valid) {

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);

                    System.out.println(
                            "AUTHENTICATION SET SUCCESSFULLY"
                    );
                }

            } catch (Exception e) {

                System.out.println("Authentication FAILED");
                System.out.println(
                        "Reason: " + e.getClass().getName()
                );
                System.out.println(
                        "Message: " + e.getMessage()
                );
            }
        }

        System.out.println(
                "SecurityContext authentication: "
                        + SecurityContextHolder
                        .getContext()
                        .getAuthentication()
        );

        System.out.println("================================");
        System.out.println();

        filterChain.doFilter(request, response);
    }
}