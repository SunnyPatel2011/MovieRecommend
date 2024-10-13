
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './m'; // Ensure this path is correct

const Recommendation = ({ movieId }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        if (!movieId) return;

        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16', // Replace with your actual API key
            page: page,
          },
        });
        setRecommendedMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch recommended movies:', error);
      }
    };
    fetchRecommendedMovies();
  }, [movieId, page]);
 
  setTimeout(() => {
    window.scroll(0,0)
  }, 500);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="recommendation">
      <h2>Recommended Movies</h2>
      <div className="recommendation-list">
        {recommendedMovies.length > 0 ? (
          recommendedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No recommendations available</p>
        )}
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

export default Recommendation;
