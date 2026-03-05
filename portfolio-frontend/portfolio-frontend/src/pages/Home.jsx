import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AboutMeBlock from "../components/AboutMeBlock";
import DropdownMenu from "../components/DropDownMenu";
import StarAuth from "../components/StarAuth";
import DevNote from "../components/DevNote";
import ProfessionalLinks from "../components/ProffesionalLinks";
import "./DeveloperCommentary.css";

function Home() {
  // Pull authentication state and user info from the AuthContext
  // These values will automatically update when login() or logout() is called
  const { isAuthenticated, role, email, token } = useContext(AuthContext);

  // Temporary placeholder data
 

  const articles = [
  {
    name: "Introduction to AI and Agents",
    date: "Feb 2026",
    synopsis: "Introductory overview of AI and agent-based systems. Goal is demystify AI concepts for beginners, and walk through building a simple agent.",
    link: "/article/introduction-to-ai-and-agents"
  },
  {
    name: "AWS and Splunk: A Beginner-Friendly Overview",
    date: "Mar 2026",
    synopsis: "Overview of AWS services and using Splunk for monitoring and observability.",
    link: "/article/aws-and-splunk-overview"
  }
  {
    name: "Deployment Strategies: Using Render to Host Your Full-Stack App",
    date: "Mar 2026",
    synopsis: "Short guide on deploying full-stack applications using Render.",
    link: "/article/deployment-strategies-render"
  }
];

  return (

    <div>

      <div className="dev-wrapper">
       <DevNote
          title="DevNotes - Draggable Developer Commentary"
          frontend="These are devnotes, a tool I use to document development decisions and architecture. 
          Cool Fact: They are draggable! You can click and drag the header to move them around the screen. Try it out!
          They are visible when Dev Mode is enabled. 
          Try toggling Dev Mode on and off to see them!
          It was a fun way to introduce myself to React Context and conditional rendering." 
      />
      </div>



      <ProfessionalLinks />
      {/* Page heading */}
      <h1>Kevin Martinez </h1>
      

      {/* Show either the user's email or "Guest" if not logged in */}
      <h2>Welcome To Homepage: {email || " Guest - log in for the best experience"}!</h2>

      <h3>About This Site: </h3>
      <p>I am a software developer and designer based in Texas.
        This portfolio site is built with Springboot and React. 
        I wanted a platform to showcase my projects, research, and writing. 
        Feel free to explore the projects and articles sections to see what I've been working on.
      </p>
      
      <p>"Never stop learning and creating!"</p>

      
      
     

      <div className="dev-wrapper">

        {/* Authentication Star Section */}
        <StarAuth />

        <DevNote
          title="Devloper Commentary: Star Authentication"
          frontend="Utilizing React Context for global auth state management. Once you log in, your email and role are stored in 
          context and accessible throughout the app."
          backend="Using JWTs for authentication. No server-side sessions."
        />
      </div>

      

      {/* About Me Section */}
      <AboutMeBlock />

      
      {/* Projects, Music & Articles */}

     
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