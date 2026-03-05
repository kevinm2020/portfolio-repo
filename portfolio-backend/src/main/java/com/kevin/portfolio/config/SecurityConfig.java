package com.kevin.portfolio.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@EnableMethodSecurity // Enables method-level security annotations like @PreAuthorize
@Configuration        // Marks this class as a Spring configuration class (bean definitions)
@RequiredArgsConstructor // Generates constructor for final fields (dependency injection)
public class SecurityConfig {

    //Security configuration class that sets up Spring Security for the application. Also adds Logger
    // and JWT filters to the security filter chain.

    // Custom filter that logs every request/response
    private final RequestLoggingFilter requestLoggingFilter;

    // Custom JWT authentication filter
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Main Spring Security configuration.
     *
     * Defines:
     * - CSRF configuration
     * - Authorization rules
     * - Security headers
     * - Custom filter order
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF (safe for stateless REST APIs using JWT)
            .csrf(csrf -> csrf.disable())

             // 👇 Enable CORS
            .cors(cors -> {})

            // Configure request authorization rules
            .authorizeHttpRequests(auth -> auth
                // Currently allowing all requests (temporary during development)
                .anyRequest().permitAll()
            )

            // Allow H2 console to render inside browser frames
            .headers(headers -> headers
                .frameOptions(frame -> frame.sameOrigin())
            )

            // Add custom filters BEFORE Spring’s default authentication filter
            // Order matters in Spring Security
            .addFilterBefore(requestLoggingFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
            "http://localhost:5173",
            "https://kevin-martinez-portfolio-frontend.onrender.com"
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    /**
     * Password encoder bean.
     *
     * BCrypt is recommended for secure password hashing.
     * Spring will automatically inject this wherever needed.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

/*
What This Configuration Means
Disable CSRF (since we’re building API)
Allow /api/auth/** without login
Protect everything else
*/

/*
Notes:

SecurityFilterChain: Core object for configuration of Spring Security. Defines how to secure application.
It defines: Authethication Rules, Authroization Rules, CSRF, Headers, Session Management, etc.
This is the security rulebook for any incoming HTTP request. It checks the request against defined rules 
and filters to determine if it should be allowed, denied, or requires authentication.

Custom Filters: Filters are components that can intercept HTTP requests and responses, before they reach the controller.
They allow me to add logggin requests and responses, and to validate JWT tokens before the request is processed by Spring Security’s default authentication mechanisms.
By adding custom filters before the default authentication filter, I can ensure that logging and JWT validation happen early in the request processing pipeline.

What kind of custom filter is being used here?
RequestLoggingFilter: This filter logs details of incoming HTTP requests and outgoing responses. It’s useful for monitoring and debugging.
JwtAuthenticationFilter: This filter checks for the presence of a JWT token in the request header, validates it, and if valid, sets the authentication context for the request.

Password Encoding: Passwords should never be stored in plain text. 
Instead we hash and store the hash and compare hashes during login.

Method Level Security:
Instead of securing endpoints only at config level.
You secure logic directly in service/controller methods.


Big Architeture Picture:

Incoming HTTP Request
        ↓
SecurityFilterChain
        ↓
Custom Filters (Logger, JWT)
        ↓
Authentication
        ↓
Authorization
        ↓
Controller
        ↓
Response

setAllowedOrigins(List.of(...)) → explicitly lists your frontend domain(s) → ✅ required when allowCredentials(true)
setAllowedMethods(...) → GET, POST, etc. → ✅ good
setAllowedHeaders(List.of("*")) → allows Authorization header → ✅ needed for JWT
setAllowCredentials(true) → allows JWT / cookies to be sent → ✅ required


*/