package com.kevin.portfolio.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * RequestLoggingFilter
 *
 * This filter logs every incoming HTTP request along with:
 * - HTTP method
 * - Request URI
 * - Response status code
 * - Total execution time
 *
 * It runs once per request and executes before the request
 * reaches the controller layer.
 *
 * Useful for:
 * - Debugging
 * - Monitoring
 * - Production diagnostics
 */

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    // Logger instance for structured logging
    private static final Logger logger =
            LoggerFactory.getLogger(RequestLoggingFilter.class);

    /**
     * Core filter logic.
     *
     * Measures request processing time and logs
     * success (2xx) vs failure (4xx/5xx).
     */
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Capture request start time
        long startTime = System.currentTimeMillis();

        try {
            // Continue the filter chain (VERY important)
            filterChain.doFilter(request, response);
        } finally {
            // Calculate total processing time
            long duration = System.currentTimeMillis() - startTime;

            int status = response.getStatus();
            String method = request.getMethod();
            String uri = request.getRequestURI();

            // Log successful responses (2xx)
            if (status >= 200 && status < 300) {
                logger.info("✅ {} {} -> {} ({} ms)",
                        method, uri, status, duration);
            }
            // Log client/server errors (4xx / 5xx)
            else {
                logger.warn("❌ {} {} -> {} ({} ms)",
                        method, uri, status, duration);
            }
        }
    }
}
