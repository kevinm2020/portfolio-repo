import axios from "axios";

const API_BASE_URL = "https://sonicai-0u5p.onrender.com";

/**
 * Normalizes the raw backend response into a clean, flat shape
 * that SonicAI.jsx can consume without deep optional chaining.
 *
 * Raw backend shape:
 * {
 *   metadata: { title, artist, album, release_date },
 *   features: {
 *     spotify: { album, duration_ms, explicit, popularity, tempo,
 *                energy, danceability, valence, mode, key, loudness,
 *                speechiness, acousticness, instrumentalness, liveness,
 *                time_signature },
 *     acoustic: { ...same as spotify }
 *   },
 *   chords: { chords: ["C", "G", "Am", "F"] },
 *   analysis: "..."
 * }
 */
function normalizeResponse(raw) {
  const metadata = raw?.metadata || {};
  const spotify = raw?.features?.spotify || {};
  const chordsRaw = raw?.chords;

  // Safely unwrap chords — could be { chords: [...] } or null
  const chords = Array.isArray(chordsRaw?.chords) ? chordsRaw.chords : [];

  // Duration: convert ms → seconds
  const duration_ms = spotify.duration_ms;
  const duration = duration_ms ? Math.round(duration_ms / 1000) : null;

  return {
    // Core identity
    title: metadata.title || "Unknown Title",
    artist: metadata.artist || "Unknown Artist",
    album: spotify.album || metadata.album || "Unknown Album",
    release_date: metadata.release_date || null,

    // Playback info
    duration,           // seconds
    explicit: spotify.explicit ?? null,
    popularity: spotify.popularity ?? null,

    // Musical features
    tempo: spotify.tempo ?? null,
    key: spotify.key ?? null,         // e.g. "D"
    mode: spotify.mode ?? null,       // "Major" / "Minor"
    time_signature: spotify.time_signature ?? null,
    loudness: spotify.loudness ?? null,

    // Vibe metrics (0.0 – 1.0)
    energy: spotify.energy ?? null,
    danceability: spotify.danceability ?? null,
    valence: spotify.valence ?? null,
    speechiness: spotify.speechiness ?? null,
    acousticness: spotify.acousticness ?? null,
    instrumentalness: spotify.instrumentalness ?? null,
    liveness: spotify.liveness ?? null,

    // Chords & analysis
    chords,
    analysis: raw?.analysis || "No analysis available.",
  };
}

export const analyzeSong = async (song, artist) => {
  const response = await axios.post(`${API_BASE_URL}/analyze`, {
    song,
    artist,
  });
  return normalizeResponse(response.data);
};