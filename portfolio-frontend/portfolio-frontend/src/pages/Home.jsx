import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  // Pull authentication state and user info from the AuthContext
  // These values will automatically update when login() or logout() is called
  const { isAuthenticated, role, email, token } = useContext(AuthContext);

  return (
    <div>
      {/* Page heading */}
      <h1>Welcome to the Home Page</h1>

      {/* Show either the user's email or "Guest" if not logged in */}
      <h2>Welcome, {email || "Guest"}!</h2>

      {/* Display authentication status */}
      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>

      {/* Display user's email */}
      <p>Email: {email || "None"}</p>

      {/* Display user's role */}
      <p>Role: {role || "None"}</p>

      {/* Show a truncated version of the token for safety */}
      <p>
        Token: {token ? token.substring(0, 20) + "..." : "None"}
      </p>

      {/* Notes:
          1. This component automatically reacts to changes in AuthContext.
             If you call login() or logout(), Home.jsx will re-render with new values.
          2. email || "Guest" ensures a default display for unauthenticated users.
          3. You can extend this page later to conditionally show admin/user features
             based on role (role === "ADMIN" ? show admin panel : hide it).
      */}
    </div>
  );
}

export default Home;
