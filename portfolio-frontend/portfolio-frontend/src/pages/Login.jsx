import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./DeveloperCommentary.css";
import DevNote from "../components/DevNote";

function Login() {

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Feedback messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get login function from context
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  /**
   * Handles login form submission
   */
  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try 
    {
      const response = await api.post("https://kevin-martinez-portfolio-backend.onrender.com/api/auth/login", { email, password });
      login({
        token: response.data.token,
        role: response.data.role,
        email: response.data.email
      });

      setSuccess("Login successful!");
      
      //redirect to login page after successful login
      navigate("/login");

    } 
    catch (error) 
    {
      console.error("Login failed:", error);

      if (error.response) {
        
        // Backend returned an error response
        
        if (error.response.status === 404) {
          setError("User not found.");
        }
        else if (error.response.status === 401) {
          setError("Invalid email or password.");
        }
        else if (typeof error.response.data === "string") {
          setError(error.response.data);
        }
        else if (error.response.data?.message) {
          setError(error.response.data.message);
        }
        else {
          setError("Login failed. Please try again.");
        }

      } 
      else if (error.request) {
        
        // No response from server
        
        setError("Cannot connect to server.");

      } 
      else {
        
        // Other error
        
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {success && <p style={{ color: "green" }}>✅ {success}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      <div className="dev-wrapper">
        <DevNote
          title="Devloper Commentary: Login Page"
          frontend=" This component manages the login form, handles user input, and communicates with the backend for authentication."
          backend=" Here we are performing a POST request to the /api/auth/login endpoint for authentication."
          security="On successful login, we store the token and user info in context. We also handle various error cases to provide feedback to the user."
  
        />
      </div>

    </form>
  );
}

export default Login;
