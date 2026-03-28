import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DevNote from "../components/DevNote";

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
    <div className="project-page">
      <h1>An introduction to AI Agents & Development</h1>
      <h2>Written by: Kevin Martinez</h2>
      <h3>
        A practical guide to building intelligent, autonomous systems through
        building my AI agent: Sonic
      </h3>

       <div className="dev-wrapper">
       <DevNote
          title="AI Book DevNotes"
          frontend="I hosted a Render Postgres database to store article content. The frontend fetches chapter data from the backend and renders it here in the frontend. Each chapter has a Read button that navigates to a dedicated page for that chapter." 
          backend="I added new infrastructure for hosting and serving articles. The backend now has a new Article entity, repository, and controller.
          I also added a PostgreSQL database to store article content."
      />
      </div>

      <h2>Table of Contents</h2>

      <table>
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
                <button onClick={() => navigate(`/chapters/${chapter.id}`)}>
                  Read
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AIBook;