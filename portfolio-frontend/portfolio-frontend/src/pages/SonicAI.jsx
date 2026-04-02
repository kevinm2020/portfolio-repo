import React, { useState, useEffect } from "react";
import { analyzeSong } from "../api/sonicAPI";
import ReactMarkdown from "react-markdown";
import "./sonic.css";
import DevNote from "../components/DevNote";

// Helper: format a 0–1 metric as a percentage string
const pct = (val) =>
  val !== null && val !== undefined ? `${Math.round(val * 100)}%` : "N/A";

// Helper: format seconds as m:ss
const formatDuration = (secs) => {
  if (secs === null || secs === undefined) return "N/A";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const SonicAnalyzer = () => {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking");

  // Load history
  useEffect(() => {
    const savedHistory = localStorage.getItem("sonicHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem("sonicHistory", JSON.stringify(history));
  }, [history]);

  // Health check
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("https://sonicai-0u5p.onrender.com/health");
        const data = await res.json();
        setBackendStatus(data.status === "ok" ? "ok" : "error");
      } catch {
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
      setHistory((prev) => [data, ...prev.slice(0, 9)]);
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
          frontend="Frontend handles input, rendering, and local history via localStorage."
          backend="Backend is a FastAPI microservice deployed on Render."
        />
      </div>

      <h1 className="sonic-title">Sonic AI Song Analyzer - BETA 1.5</h1>

      <div className="sonic-status">
        {backendStatus === "checking" && <p>🟡 Connecting...</p>}
        {backendStatus === "ok" && <p>🟢 Online</p>}
        {backendStatus === "error" && <p>🔴 Offline</p>}
      </div>

      {/* FORM */}
      <form className="sonic-form" onSubmit={handleSubmit}>
        <input
          className="sonic-input"
          type="text"
          placeholder="Song Title"
          value={song}
          onChange={(e) => setSong(e.target.value)}
        />
        <input
          className="sonic-input"
          type="text"
          placeholder="Artist Name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button className="sonic-button" type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {loading && <p>Analyzing...</p>}
      {error && <p className="sonic-error">{error}</p>}

      {/* RESULT */}
      {result && (
        <div className="sonic-result">
          <h3>
            {result.title} — {result.artist}
          </h3>

          <p><strong>Album:</strong> {result.album}</p>
          <p><strong>Released:</strong> {result.release_date || "N/A"}</p>
          <p><strong>Duration:</strong> {formatDuration(result.duration)}</p>
          <p><strong>Explicit:</strong> {result.explicit ? "Yes" : "No"}</p>
          <p><strong>Popularity:</strong> {result.popularity ?? "N/A"}</p>

          <p><strong>Key:</strong> {result.key || "N/A"} {result.mode || ""}</p>
          <p><strong>Tempo:</strong> {result.tempo ? `${Math.round(result.tempo)} BPM` : "N/A"}</p>

          <h4>Audio Features</h4>
          <ul>
            <li>Energy: {pct(result.energy)}</li>
            <li>Danceability: {pct(result.danceability)}</li>
            <li>Valence: {pct(result.valence)}</li>
            <li>Speechiness: {pct(result.speechiness)}</li>
            <li>Acousticness: {pct(result.acousticness)}</li>
            <li>Instrumentalness: {pct(result.instrumentalness)}</li>
            <li>Liveness: {pct(result.liveness)}</li>
          </ul>

          <h4>Chords</h4>
          <ul>
            {result.chords.length > 0 ? (
              result.chords.map((chord, i) => <li key={i}>{chord}</li>)
            ) : (
              <li>No chords available</li>
            )}
          </ul>

          <h4>Analysis</h4>
          <ReactMarkdown>{result.analysis}</ReactMarkdown>
        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div>
          <h3>Recent Analyses</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index} onClick={() => setResult(item)}>
                {item.title} — {item.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SonicAnalyzer;