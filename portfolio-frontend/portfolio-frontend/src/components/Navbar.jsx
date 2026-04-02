import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DevModeContext } from "../context/DevModeContext";

import DevNote from "./DevNote"; 

function DevToggle() 
{
  const { devMode, setDevMode } = useContext(DevModeContext);
  
  return (
    <button onClick={() => setDevMode(!devMode)}>
      {devMode ? "Disable Dev Mode" : "Enable Dev Mode"}
    </button>
  );
}

function Navbar() {

  const { isAuthenticated, logout, role} =
    useContext(AuthContext);

  return (
    <nav>
      {/* Always visible */}
      <Link to="/">HOME PAGE</Link>{" | "}
      <Link to="/career"> CAREER PAGE</Link>{" | "}


      {/* Show Login/Register only if NOT authenticated */}
      {!isAuthenticated && (
        <>
          <Link to="/login">LOGIN PAGE</Link>{" | "}
          <Link to="/register">REGISTER PAGE</Link>
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

      {/* Dev Mode Toggle */}
      <DevToggle />

      

     
      
    </nav>
  );
}

export default Navbar;
