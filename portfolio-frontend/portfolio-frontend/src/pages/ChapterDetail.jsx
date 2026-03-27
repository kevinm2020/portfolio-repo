import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ChapterDetail() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    fetch(
      `https://kevin-martinez-portfolio-backend.onrender.com/api/chapters/${id}`
    )
      .then((res) => res.json())
      .then((data) => setChapter(data))
      .catch((err) => console.error("Error fetching chapter:", err));
  }, [id]);

  if (!chapter) return <p>Loading...</p>;

  return (
    <div className="project-page">
      <h1>
        Chapter {chapter.number}: {chapter.title}
      </h1>

      <p>{chapter.description}</p>

      <hr />

      <pre style={{ whiteSpace: "pre-wrap" }}>{chapter.content}</pre>
    </div>
  );
}

export default ChapterDetail;