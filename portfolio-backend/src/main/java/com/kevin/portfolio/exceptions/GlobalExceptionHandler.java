package com.kevin.portfolio.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.jsonwebtoken.ExpiredJwtException;

@RestControllerAdvice
public class GlobalExceptionHandler 
{

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentials() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid email or password");
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<String> handleExpiredJwt() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Token expired");
    }



    
}


/*

A Rest Controller Advice is a special type of controller in Spring that allows you to handle exceptions globally across your application.
In simple terms, it acts as a centralized error handler for your RESTful APIs. When an exception is thrown in any of your controllers, the Rest Controller Advice can catch that exception and return a custom response to the client.
This makes our REST API more robust and user-friendly, as we can provide meaningful error messages and appropriate HTTP status codes when something goes wrong. 
In this code, we have handlers for UserNotFoundException, BadCredentialsException, and ExpiredJwtException, each returning a specific response to the client when those exceptions occur.
 */