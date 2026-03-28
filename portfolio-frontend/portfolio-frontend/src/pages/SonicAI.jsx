import React, { useState, useEffect } from "react";
import {analyzeSong} from "../api/sonicAPI";
import ReactMarkdown from "react-markdown";
import "./sonic.css";
import DevNote from "../components/DevNote";

const SonicAnalyzer = () => {

  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking"); 

  // ✅ Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("sonicHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // ✅ Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sonicHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
  const checkHealth = async () => {
    try {
      const res = await fetch("https://sonicai-0u5p.onrender.com/health");
      const data = await res.json();

      if (data.status === "ok") {
        setBackendStatus("ok");
      } else {
        setBackendStatus("error");
      }
    } catch (err) {
      setBackendStatus("error");
    }
  };

  checkHealth();

  const interval = setInterval(checkHealth, 30000);
  return () => clearInterval(interval);
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!song.trim() || !artist.trim()) {
      setError("Both song and artist are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeSong(song, artist);
      setResult(data);

      // ✅ Add to history (newest first)
      setHistory((prev) => [data, ...prev.slice(0, 9)]); // limit to 10 items

    } catch (err) {
      if (err.response) {
        setError("Server error. Try again later.");
      } else if (err.request) {
        setError("Network error. Check your connection.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sonic-container">

      <div className="dev-wrapper">
       <DevNote
          title="Sonic AI (microservice) DevNotes"
          frontend="The frontend is used for the user to input a song and artist, and display the analysis results. It also maintains a local history of recent analyses using localStorage." 
          backend="Sonic AI is it's own seperate microservice. Sonic AI was developed in Python, and hosted as Render Web service. Sonic Ai has an enpoint to recieve song/artist input, and output analysis results."
      />
      </div>

      <h2 className="sonic-title">Sonic AI Analyzer</h2>
      <h3 className="sonic-subtitle">Analyze Your Favorite Songs</h3>

      <div className="sonic-status">
        {backendStatus === "checking" && <p>🟡 Connecting to Sonic AI...</p>}
        {backendStatus === "ok" && <p>🟢 Sonic AI is online</p>}
        {backendStatus === "error" && <p>🔴 Sonic AI is offline</p>}
      </div>

      {/* FORM */}
      <form className="sonic-form" onSubmit={handleSubmit}>

        <input
          className="sonic-input"
          type="text"
          placeholder="Song"
          value={song}
          onChange={(e) => setSong(e.target.value)}
        />

        <input
          className="sonic-input"
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <button className="sonic-button" type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

      </form>

      {loading && <p className="sonic-loading">🎧 Analyzing your track...</p>}

      {error && <p className="sonic-error">{error}</p>}

      {/* RESULT */}
      {result && (
        <div className="sonic-result">

          <h3 className="sonic-result-title">
            {result?.metadata?.title || "Unknown Title"} -{" "}
            {result?.metadata?.artist || "Unknown Artist"}
          </h3>

          <p><strong>Album:</strong> {result?.metadata?.album || "N/A"}</p>
          <p><strong>Mode:</strong> {result?.mode || "N/A"}</p>
          <p>
            <strong>Duration:</strong>{" "}
            {result?.features?.duration
              ? `${result.features.duration}s`
              : "N/A"}
          </p>
          <p>
            <strong>Explicit:</strong>{" "}
            {result?.features?.explicit !== undefined
              ? result.features.explicit ? "Yes" : "No"
              : "N/A"}
          </p>

          <h4>Chords</h4>
          <ul className="sonic-chords">
            {result?.chords?.length > 0 ? (
              result.chords.map((chord, index) => (
                <li key={index}>{chord}</li>
              ))
            ) : (
              <li>No chords available</li>
            )}
          </ul>

          <h4>Analysis</h4>
          <div className="sonic-analysis">
            <ReactMarkdown>
              {result?.analysis || "No analysis available."}
            </ReactMarkdown>
          </div>

        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div className="sonic-history">

          <h3 className="sonic-history-title">Recent Analyses</h3>

          <ul className="sonic-history-list">
            {history.map((item, index) => (
              <li
                key={index}
                className="sonic-history-item"
                onClick={() => setResult(item)}
              >
                {item?.metadata?.title || "Unknown"} -{" "}
                {item?.metadata?.artist || "Unknown"}
              </li>
            ))}
          </ul>

        </div>
      )}
    </div>
  );
};

export default SonicAnalyzer;