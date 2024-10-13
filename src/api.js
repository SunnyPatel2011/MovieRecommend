// src/api.js
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '8deb5744491f87ca02e176e8ebe02f16'; // Replace with your actual API key

export const fetchPopularMovies = async () => {
  const response = await axios.get(`${API_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};
