package com.posterior.controller;

import com.posterior.dto.AuthRequest;
import com.posterior.dto.AuthResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.apiKey}")
    private String supabaseApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        String url = supabaseUrl + "/auth/v1/signup";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("apikey", supabaseApiKey);

        HttpEntity<AuthRequest> entity = new HttpEntity<>(request, headers);
        ResponseEntity<AuthResponse> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                AuthResponse.class
        );

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        String url = supabaseUrl + "/auth/v1/token?grant_type=password";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("apikey", supabaseApiKey);

        HttpEntity<AuthRequest> entity = new HttpEntity<>(request, headers);
        ResponseEntity<AuthResponse> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                AuthResponse.class
        );

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}
