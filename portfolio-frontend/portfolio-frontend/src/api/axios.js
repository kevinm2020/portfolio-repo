import axios from "axios";

// Create reusable axios instance
const api = axios.create({
  baseURL: "https://kevin-martinez-portfolio-backend.onrender.com", // Your Spring Boot backend
});

/**
 * Interceptor runs BEFORE every request
 * Automatically attaches JWT token if it exists
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
//Expired or invalid token will trigger a 401 response from the backend,
//which we catch here to clear the token and redirect to login page.

export default api;


/*
Without this interceptor, 
we would have to manually attach the JWT token to the Authorization header 
in every API call throughout our application. 
This would lead to a lot of repetitive code and increase the chances of 
forgetting to include the token in some requests, which would result in unauthorized errors.
Now it's handled automatically for every request, 
ensuring that authenticated endpoints work seamlessly

What is axios? : Axios is a popular JavaScript library used to make HTTP requests 
from the browser or Node.js.

Why use a centrailized axios instance?
1. Base URL: We can set a common base URL for all requests, so we don't have to repeat it every time.
2. Interceptors: We can define interceptors to automatically attach the JWT token to the Authorization header for every request, ensuring that authenticated endpoints work seamlessly.
3. Centralized Configuration: We can manage headers, timeouts, and other settings in one place, making it easier to maintain and update our API calls across the entire application.
4. Reusability: We can reuse this configured instance throughout our app, reducing code duplication and improving consistency in how we make API calls.

*/