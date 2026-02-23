package com.kevin.portfolio.service;

import com.kevin.portfolio.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service // Marks this class as a Spring service so it can be injected into other classes
public class JwtService {
    
    // 256-bit secret key for signing JWTs (HS256 requires at least 32 bytes)
    // This is your "password" for JWTs — anyone with it can generate valid tokens
    private static final String SECRET_STRING = "MySuperSecretKeyForJWTMySuperSecretKey!"; 

    // Token expiration time: 1 hour (milliseconds)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    // Key object used by JJWT library to sign and verify tokens
    private final Key key;

    // Constructor: convert the string secret into a proper Key object for HS256
    public JwtService() {
        // Keys.hmacShaKeyFor(byte[]) converts the secret string into a secure key
        this.key = Keys.hmacShaKeyFor(SECRET_STRING.getBytes());
    }

    // Method to generate a JWT token for a given email
    public String generateToken(User user) {
        return Jwts.builder()                // Start building the JWT
                .setSubject(user.getEmail())          // The "subject" of the token — typically the user identifier
                .claim("role", user.getRole().name())
                .setIssuedAt(new Date())    // When the token was issued
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // When it will expire
                .signWith(key, SignatureAlgorithm.HS256) // Sign the token with your secret key using HS256
                .compact();                 // Generate the final token string
    }

    // Method to extract the email (subject) from a JWT token
    public String extractEmail(String token) {
        try {
            // Parse the token
            Claims claims = Jwts.parserBuilder() // Start a parser builder
                    .setSigningKey(key)          // Set the same key used to sign it
                    .build()                     // Build the parser
                    .parseClaimsJws(token)       // Parse the JWT string
                    .getBody();                  // Get the payload (claims)

            return claims.getSubject();          // Return the "subject" field (email)
        } 
        catch (JwtException e) {
            // If parsing fails (invalid token, expired, or tampered), throw an exception
            throw new RuntimeException("Invalid JWT token");
        }
    }

    public String extractRole(String token) 
    {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("role", String.class);
    }

}



/*


Notes on JWT
What’s happening conceptually
JWT = JSON Web Token: a compact string that contains information (claims) like the user email, signed so no one can tamper with it.
generateToken(email) creates a JWT for a specific user and signs it with your secret key.
extractEmail(token) verifies the signature and pulls the email out if the token is valid. If it’s invalid or expired, it throws an error.
The Key object is required by JJWT 0.11+ — you can’t just use a raw string anymore.

   [Client / Frontend / Postman]
                 |
         1️⃣ POST /api/auth/login
         (email + password)
                 |
                 v
   [Spring Boot Backend: AuthController]
                 |
         AuthService checks user credentials
                 |
       2️⃣ If valid, calls JwtService.generateToken(email)
                 |
                 v
        [JwtService builds JWT]
          - Subject = email
          - IssuedAt = now
          - Expiration = +1h
          - Signed with secret key
                 |
                 v
       JWT string returned to client
                 |
         3️⃣ Client stores JWT
           (localStorage / memory)
                 |
         4️⃣ Client calls protected endpoints
           with header: Authorization: Bearer <JWT>
                 |
                 v
   [Spring Security / JwtFilter intercepts request]
       - Extracts token
       - Validates signature & expiration
       - Extracts email
       - Loads user if needed
                 |
         5️⃣ Request is allowed or rejected
       (401 if token invalid, 200 if valid)

*/