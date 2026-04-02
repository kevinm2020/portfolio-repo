import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./DeveloperCommentary.css";
import DevNote from "../components/DevNote";
import "./Login.css";

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
      const response = await api.post(
        "https://kevin-martinez-portfolio-backend.onrender.com/api/auth/login",
        { email, password }
      );

      login({
        token: response.data.token,
        role: response.data.role,
        email: response.data.email
      });

      setSuccess("Login successful!");
      
      //redirect to home page after successful login
      navigate("/", { replace: true });

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
    <div className="login-page">

      {/* LOGIN CARD */}
      <div className="login-card">

        <section className="login-header">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Welcome back. Please sign in.</p>
        </section>

        {/* FEEDBACK */}
        {error && <p className="login-error">❌ {error}</p>}
        {success && <p className="login-success">✅ {success}</p>}

        {/* FORM */}
        <form className="login-form" onSubmit={handleSubmit}>

          <input
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-button" type="submit">
            Login
          </button>

        </form>

        {/* DEV NOTE */}
        <div className="dev-wrapper">
          <DevNote
            title="Devloper Commentary: Login Page"
            frontend=" This component manages the login form, handles user input, and communicates with the backend for authentication."
            backend=" Here we are performing a POST request to the /api/auth/login endpoint for authentication."
            security="On successful login, we store the token and user info in context. We also handle various error cases to provide feedback to the user."
          />
        </div>

      </div>

    </div>
  );
}

export default Login;