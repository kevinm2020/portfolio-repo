import React, { useState, useEffect } from "react";
import { analyzeSong } from "../api/sonicAPI";
import ReactMarkdown from "react-markdown";
import "./sonic.css";
import DevNote from "../components/DevNote";

// Helper: format a 0–1 metric as a percentage string
const pct = (val) => (val !== null && val !== undefined ? `${Math.round(val * 100)}%` : "N/A");

// Helper: format seconds as m:ss
const formatDuration = (secs) => {
  if (!secs) return "N/A";
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

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("sonicHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sonicHistory", JSON.stringify(history));
  }, [history]);

  // Poll backend health every 30s
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
      setHistory((prev) => [data, ...prev.slice(0, 9)]); // keep last 10
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
          backend="Sonic AI is its own separate microservice. Sonic AI was developed in Python, and hosted as a Render Web service. Sonic AI has an endpoint to receive song/artist input, and output analysis results."
        />
      </div>

      <h1 className="sonic-title">Sonic AI Song Analyzer - BETA 1.5</h1>
      <h2 className="sonic-subtitle">Built with React, Python, Spotify API and OpenAI LLM API</h2>
      <h4 className="sonic-subtitle">Instructions: Enter a song and artist to analyze</h4>

      <div className="sonic-status">
        {backendStatus === "checking" && <p>🟡 Connecting to Sonic AI...</p>}
        {backendStatus === "ok"       && <p>🟢 Sonic AI is online</p>}
        {backendStatus === "error"    && <p>🔴 Sonic AI is offline</p>}
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

      {loading && <p className="sonic-loading">Analyzing your track...might take a minute...hang on</p>}
      {error   && <p className="sonic-error">{error}</p>}

      {/* RESULT */}
      {result && (
        <div className="sonic-result">

          {/* Title / Artist */}
          <h3 className="sonic-result-title">
            {result.title} — {result.artist}
          </h3>

          {/* Metadata row */}
          <div className="sonic-meta">
            <p><strong>Album:</strong> {result.album}</p>
            <p><strong>Released:</strong> {result.release_date || "N/A"}</p>
            <p><strong>Duration:</strong> {formatDuration(result.duration)}</p>
            <p><strong>Explicit:</strong> {result.explicit !== null ? (result.explicit ? "Yes" : "No") : "N/A"}</p>
            <p><strong>Popularity:</strong> {result.popularity !== null ? `${result.popularity}/100` : "N/A"}</p>
          </div>

          {/* Musical key / tempo */}
          <div className="sonic-musical">
            <p><strong>Key:</strong> {result.key || "N/A"} {result.mode || ""}</p>
            <p><strong>Tempo:</strong> {result.tempo ? `${Math.round(result.tempo)} BPM` : "N/A"}</p>
            <p><strong>Time Signature:</strong> {result.time_signature ? `${result.time_signature}/4` : "N/A"}</p>
            <p><strong>Loudness:</strong> {result.loudness !== null ? `${result.loudness} dB` : "N/A"}</p>
          </div>

          {/* Vibe metrics */}
          <div className="sonic-metrics">
            <h4>Audio Features</h4>
            <ul>
              <li><strong>Energy:</strong> {pct(result.energy)}</li>
              <li><strong>Danceability:</strong> {pct(result.danceability)}</li>
              <li><strong>Valence (mood):</strong> {pct(result.valence)}</li>
              <li><strong>Speechiness:</strong> {pct(result.speechiness)}</li>
              <li><strong>Acousticness:</strong> {pct(result.acousticness)}</li>
              <li><strong>Instrumentalness:</strong> {pct(result.instrumentalness)}</li>
              <li><strong>Liveness:</strong> {pct(result.liveness)}</li>
            </ul>
          </div>

          {/* Chords */}
          <h4>Chords</h4>
          <ul className="sonic-chords">
            {result.chords.length > 0 ? (
              result.chords.map((chord, index) => (
                <li key={index}>{chord}</li>
              ))
            ) : (
              <li>No chords available</li>
            )}
          </ul>

          {/* LLM Analysis */}
          <h4>Analysis</h4>
          <div className="sonic-analysis">
            <ReactMarkdown>{result.analysis}</ReactMarkdown>
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
                {item?.title || "Unknown"} — {item?.artist || "Unknown"}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default SonicAnalyzer;