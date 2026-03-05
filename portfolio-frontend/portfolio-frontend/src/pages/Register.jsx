import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./DeveloperCommentary.css";
import DevNote from "../components/DevNote";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidName = (name) => {
  return /^[A-Za-z'-]{2,30}$/.test(name);
};

const isValidPassword = (password) => {
  // Minimum 8 chars, at least one letter and one number
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
};

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

    // Required fields
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Name validation
    if (!isValidName(firstName)) {
      setError("First name must contain only letters and be 2–30 characters.");
      return;
    }

    if (!isValidName(lastName)) {
      setError("Last name must contain only letters and be 2–30 characters.");
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters and include at least one letter and one number."
      );
      return;
    }

    try 
    {
      await api.post("https://kevin-martinez-portfolio-backend.onrender.com/api/auth/register", {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
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

      <div className="dev-wrapper">
        <DevNote
          title="Devloper Commentary: Register Page"
          frontend="This component manages the registration form, handles user input, and 
          communicates with the backend for account creation."
          backend="POST request to /api/auth/register to create new user."
          security="Valid registration returns success message, and procceds to login page. Errors are handled and displayed to the user."
        />
      </div>
    </form>
  );
}

export default Register;
