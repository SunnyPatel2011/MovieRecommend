import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './m';
import '../css/PaginatedMovies.css';

const PaginatedMovies = ({ fetchUrl, title }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async (page) => {
      try {
        const response = await axios.get(fetchUrl, {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16',
            page: page,
          },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies(currentPage);
  }, [fetchUrl, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="paginated-movies">
      <h2 className='discover-title-name'>{title}</h2>
      <p className='discover-title-below'> MOVIES</p>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button disabled={currentPage === 1}  className="pagination-button" onClick={() => handlePageChange(currentPage - 1)  }> Previous</button>
        )}
        {currentPage < totalPages && (
          <button  className="pagination-button" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default PaginatedMovies;
