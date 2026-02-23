package com.kevin.portfolio.service;


import com.kevin.portfolio.entity.User;
import com.kevin.portfolio.dto.RegisterRequest;
import com.kevin.portfolio.entity.Role;
import com.kevin.portfolio.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService 
{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
                .email(request.getEmail())
                .password(encodedPassword)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }   

    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    public String login(String email, String password) 
    {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));             //Find User (user) in DB

        if (!passwordEncoder.matches(password, user.getPassword())) {               //Matches provided credentials with stored credentials
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user);                       //uses JWT service to generate a JWT upon succesful login
    }



}
