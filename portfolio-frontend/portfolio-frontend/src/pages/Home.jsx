import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AboutMeBlock from "../components/AboutMeBlock";
import DropdownMenu from "../components/DropDownMenu";
import StarAuth from "../components/StarAuth";
import DevNote from "../components/DevNote";
import ProfessionalLinks from "../components/ProffesionalLinks";
import "./DeveloperCommentary.css";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  // Pull authentication state and user info from the AuthContext
  // These values will automatically update when login() or logout() is called
  const { isAuthenticated, role, email, token } = useContext(AuthContext);
  const navigate = useNavigate();


 
  //This is the articles data for the dropdown menu. Each article has a name, date, synopsis, and link to the full article page.

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
    },
    {
      name: "Deployment Strategies: Using Render to Host Your Full-Stack App",
      date: "Mar 2026",
      synopsis: "Short guide on deploying a full-stack app using Render.com, covering both frontend and backend deployment steps.",
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
      <h1>Kevin A. Martinez </h1>
      

      {/* Show either the user's email or "Guest" if not logged in */}
      <h2>Welcome To Portfolio Homepage: {email || " Guest - LOG IN FOR THE BEST EXPERIENCE"}!</h2>

      <h3>About This Site: </h3>
      <p>I am a software developer and designer based in Texas.
        This portfolio site is built with Springboot backend and React frontend. 
        I wanted a platform to showcase my projects, research, and writing. 
        Feel free to explore the projects and articles sections to see what I've been working on.
      </p>
      
      <p>"Never stop learning and creating!"</p>

      {/* Star Projects Section */}
      <div>
      <section className="hero">

        <h1>SONIC AI and Introduction to Ai Agents</h1>
        <h2>by Kevin Martinez</h2>
        <p>
          I built Sonic AI as a music producer who wanted to better understand what makes my favorite tracks stand out. 
          This project evolved into a music intelligence tool that analyzes songs using AI, helping both creators and listeners 
          break down structure, mood, and musical patterns. 

          Built with Python and React, Sonic AI explores how AI agents can transform song data into meaningful insights. 
          You can also explore my companion guide on AI and agents for a beginner-friendly look into the concepts behind the system.
        </p>

        <div className="hero-buttons">
          <button onClick={() => navigate("/sonic-ai")}>
            Explore Sonic AI
          </button>

          <button onClick={() => navigate("/ai-book")}>
            Read the AI Book
          </button>
        </div>
      </section>
    </div>

  
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