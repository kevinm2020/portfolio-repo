import axios from "axios";

const API_BASE_URL = "https://sonicai-0u5p.onrender.com";

/**
 * Normalizes backend response into a clean flat shape
 */
function normalizeResponse(raw) {
  const metadata = raw?.metadata || {};
  const spotify = raw?.features?.spotify || {};
  const chordsRaw = raw?.chords;

  const chords = Array.isArray(chordsRaw?.chords) ? chordsRaw.chords : [];

  const duration_ms = spotify.duration_ms;
  const duration = duration_ms ? Math.round(duration_ms / 1000) : null;

  return {
    // Core identity
    title: metadata.title || "Unknown Title",
    artist: metadata.artist || "Unknown Artist",
    album: metadata.album || "Unknown Album",
    release_date: metadata.release_date || null,

    // Playback info
    duration,
    explicit: spotify.explicit ?? null,
    popularity: spotify.popularity ?? null,

    // Musical features
    tempo: spotify.tempo ?? null,
    key: spotify.key ?? null,
    mode: spotify.mode ?? null,
    time_signature: spotify.time_signature ?? null,
    loudness: spotify.loudness ?? null,

    // Vibe metrics
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