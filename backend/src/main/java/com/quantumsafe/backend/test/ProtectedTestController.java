package com.quantumsafe.backend.test;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/test")
public class ProtectedTestController {

    @GetMapping("/protected")
    public Map<String, Object> protectedEndpoint(Authentication authentication) {

        Map<String, Object> response = new HashMap<>();

        response.put("message", "JWT authentication successful");
        response.put("authenticated", authentication != null && authentication.isAuthenticated());
        response.put("username", authentication.getName());

        return response;
    }
}