import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // or your backend

export const analyzeSong = async (song, artist) => {
  const response = await axios.post(`${API_BASE_URL}/analyze`, {
    song,
    artist,
  });
  return response.data;
};