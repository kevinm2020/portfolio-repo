import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const { isAuthenticated, logout, role} =
    useContext(AuthContext);

  return (
    <nav>
      {/* Always visible */}
      <Link to="/">Home</Link>{" | "}

      {/* Show Login/Register only if NOT authenticated */}
      {!isAuthenticated && (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </>
      )}

      {/* Show Admin Panel only if ADMIN */}
      {isAuthenticated && role === "ADMIN" && (
        <>
          <Link to="/admin/users">ADMIN PANEL</Link>{" | "}
        </>
      )}

      {/* Show Logout only if authenticated */}
      {isAuthenticated && (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;
