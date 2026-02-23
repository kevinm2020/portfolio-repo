import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
      const response = await api.post("/api/auth/login", { email, password });
      login({
        token: response.data.token,
        role: response.data.role,
        email: response.data.email
      });

      setSuccess("Login successful!");
      
      //redirect to homepage after 1 second
      setTimeout(() => navigate("/"), 1000);

    } 
    catch (error) 
    {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Login failed:", error);
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
    </form>
  );
}

export default Login;
