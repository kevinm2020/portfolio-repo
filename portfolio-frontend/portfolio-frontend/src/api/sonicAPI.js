import axios from "axios";

const API_BASE_URL = "https://sonicai-o3l7.onrender.com"; // or your backend

export const analyzeSong = async (song, artist) => {
  const response = await axios.post(`${API_BASE_URL}/analyze`, {
    song,
    artist,
  });
  return response.data;
};