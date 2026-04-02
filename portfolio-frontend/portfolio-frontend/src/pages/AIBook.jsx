import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DevNote from "../components/DevNote";
import "./AIBook.css";

function AIBook() {
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://kevin-martinez-portfolio-backend.onrender.com/api/chapters")
      .then((res) => res.json())
      .then((data) => setChapters(data))
      .catch((err) => console.error("Error fetching chapters:", err));
  }, []);

  return (
    <div className="ai-book-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1 className="hero-title">Building AI Agents from Scratch</h1>
        <h2 className="hero-subtitle">by Kevin Martinez</h2>

        <p className="hero-description">
          I wrote this guide while building Sonic AI to break down how AI agents actually work—beyond the hype.
          It’s designed for developers who want to understand and build intelligent systems from the ground up,
          using real examples, architecture, and code.
        </p>
      </section>

      {/* DEV NOTES SECTION */}
      <section className="dev-section">
        <div className="dev-wrapper">
          <DevNote
            title="AI Book DevNotes"
            frontend="I hosted a Render Postgres database to store article content. The frontend fetches chapter data from the backend and renders it here in the frontend. Each chapter has a Read button that navigates to a dedicated page for that chapter." 
            backend="I added new infrastructure for hosting and serving articles. The backend now has a new Article entity, repository, and controller.
          I also added a PostgreSQL database to store article content."
          />
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="intro-section">
        <h2>Explore the Chapters</h2>
        <p>
          Each chapter builds on the last, combining theory with real implementation details.
        </p>
      </section>

      {/* TABLE SECTION */}
      <section className="table-section">
        <h2>Table of Contents</h2>

        <div className="table-container">
          <table className="chapters-table">
            <thead>
              <tr>
                <th>Chapter</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {chapters.map((chapter) => (
                <tr key={chapter.id}>
                  <td>{chapter.number}</td>
                  <td>{chapter.title}</td>
                  <td>{chapter.description}</td>
                  <td>
                    <button
                      className="read-button"
                      onClick={() => navigate(`/chapters/${chapter.id}`)}
                    >
                      Read Chapter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

export default AIBook;