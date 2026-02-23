package com.kevin.portfolio.controller;

import com.kevin.portfolio.service.AuthService;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.kevin.portfolio.dto.LoginRequest;
import com.kevin.portfolio.dto.LoginResponse;
import com.kevin.portfolio.dto.RegisterRequest;
import com.kevin.portfolio.entity.User;
import com.kevin.portfolio.repository.UserRepository;





@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    

    private final AuthService authService;
    private final UserRepository userRepository;

    //This is just an endpoint that returns what is sent
    @PostMapping("/hello")
    public String hello(@RequestBody Map<String, Object> body) {
        System.out.println("Received body: " + body);
        return "OK";
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<User> getAllUsers()
    {
        return authService.getAllUsers();
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
    String token = authService.login(request.getEmail(), request.getPassword());
    User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

    return new LoginResponse(token, user.getEmail(), user.getRole());
}


    

    
}


/*
@RestController handles HTTP requests and return JSON
@RequestMapping("/api/auth") → Base URL
@PostMapping("/register") → Full endpoint becomes:
POST http://localhost:8080/api/auth/register

User must hit the register endpoint with their data provided to register.


Terminal Commands
 ./mvnw spring-boot:run

*/