package com.kevin.portfolio.dto;


import lombok.Data;
import com.kevin.portfolio.entity.Role;

@Data
public class LoginResponse {

    private String token;
    private String email;
    private Role role;

    public LoginResponse(String token, String email, Role role) {
        this.token = token;
        this.email = email;
        this.role = role;
    }

    // Getters and setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    
}
