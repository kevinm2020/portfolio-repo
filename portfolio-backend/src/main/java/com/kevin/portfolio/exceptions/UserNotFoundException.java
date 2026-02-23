package com.kevin.portfolio.exceptions;

public class UserNotFoundException extends RuntimeException {

     public UserNotFoundException(String message) {
        super(message);
    }
    
}
