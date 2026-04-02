import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./DeveloperCommentary.css";
import DevNote from "../components/DevNote";
import "./Register.css";

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
      navigate("/login", { replace: true });  

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
    <div className="register-page">

      {/* CARD */}
      <div className="register-card">

        {/* HEADER */}
        <section className="register-header">
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">Sign up to get started</p>
        </section>

        {/* FEEDBACK */}
        {error && <p className="register-error">❌ {error}</p>}
        {success && <p className="register-success">✅ {success}</p>}

        {/* FORM */}
        <form className="register-form" onSubmit={handleSubmit}>

          <input
            className="register-input"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
  
          <input
            className="register-input"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            className="register-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="register-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="register-button" type="submit">
            Register
          </button>

        </form>

        {/* DEV NOTE */}
        <div className="dev-wrapper">
          <DevNote
            title="Devloper Commentary: Register Page"
            frontend="This component manages the registration form, handles user input, and communicates with the backend for account creation."
            backend="POST request to /api/auth/register to create new user."
            security="Valid registration returns success message, and procceds to login page. Errors are handled and displayed to the user."
          />
        </div>

      </div>

    </div>
  );
}

export default Register;