package com.posterior.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String access_token;
    private String token_type;
    private long expires_in;
    private String refresh_token;
    private String userId;
}
