import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {

  //Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Feedback messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();


  /**
   * Handles registration
   */
  const handleSubmit = async (e) => 
  {

    // Prevent default form submission
    e.preventDefault();

    // Reset previous messages
    setError(""); 
    setSuccess("");

     // Basic validation
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try 
    {
      await api.post("/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role: "USER"
      });

      // After register, send user to login page
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/login"), 1000);

    } 
    catch (err) 
    {

      // Show backend error or generic error
      if (err.response && err.response.data) 
      {
        setError(err.response.data);
      } 
      else 
      {
        setError("Registration failed. Please try again.");
      }

      console.error("Registration failed:", err);
      
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {success && <p style={{ color: "green" }}>✅ {success}</p>}

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
  
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

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

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
