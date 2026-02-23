import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AboutMeBlock from "../components/AboutMeBlock";
import DropdownMenu from "../components/DropdownMenu";
import StarAuth from "../components/StarAuth";

function Home() {
  // Pull authentication state and user info from the AuthContext
  // These values will automatically update when login() or logout() is called
  const { isAuthenticated, role, email, token } = useContext(AuthContext);

  // Temporary placeholder data
  const projects = [
    { name: "Portfolio Website", date: "Feb 2026", synopsis: "My main portfolio site.", link: "#" },
    { name: "Todo App", date: "Jan 2026", synopsis: "A simple todo list app.", link: "#" },
  ];

  const articles = [
    { name: "React Hooks Overview", date: "Feb 2026", synopsis: "Understanding useState & useEffect.", link: "#" },
    { name: "CSS Grid vs Flexbox", date: "Jan 2026", synopsis: "When to use each layout method.", link: "#" },
  ];

  return (

    <div>
      {/* Page heading */}
      <h1>Kevin Martinez Portfolio</h1>

      {/* Show either the user's email or "Guest" if not logged in */}
      <h2>Welcome To Homepage: {email || "Guest"}!</h2>

      {/* Authentication Star Section */}
      <StarAuth /> 

      {/* About Me Section */}
      <AboutMeBlock />

      {/* Projects, Music & Articles */}

      <DropdownMenu title="Projects" items={projects} />
      <DropdownMenu title="Articles" items={articles} />
      
    </div>

  );
}

export default Home;


/* Notes:
          1. This component automatically reacts to changes in AuthContext.
             If you call login() or logout(), Home.jsx will re-render with new values.
          2. email || "Guest" ensures a default display for unauthenticated users.
          3. You can extend this page later to conditionally show admin/user features
             based on role (role === "ADMIN" ? show admin panel : hide it).
*/