import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './m'; // Ensure this path is correct

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16', // Replace with your actual API key
            sort_by: 'popularity.desc',
            page: page,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, [page]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="movie-grid">
      <div className="movie-grid-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={prevPage} disabled={page === 1} className="pagination-button">
          Previous Page
        </button>
        <button onClick={nextPage} className="pagination-button">
          Next Page
        </button>
      </div>
    </div>
  );
};

export default MovieGrid;