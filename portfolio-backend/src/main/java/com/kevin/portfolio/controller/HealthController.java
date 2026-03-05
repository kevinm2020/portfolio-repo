package com.kevin.portfolio.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class HealthController 
{
    @GetMapping("/pong")
    public Map<String, String> health() {
    return Map.of(
        "status", "UP",
        "service", "portfolio-backend"
    );
}
}
