import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./StarAuth.css";

const StarAuth = () => {
  const { isAuthenticated, role, email, token } = useContext(AuthContext);

  return (
    <div className="star-container">
      <div className="star-shape">
        <div className="star-content">
          <h3>{isAuthenticated ? "Authenticated User" : "Guest"}</h3>
          <p>Email: {email || "None"}</p>
          <p>Role: {role || "None"}</p>
          <p>
            Token: {token ? token.substring(0, 20) + "..." : "None"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StarAuth;