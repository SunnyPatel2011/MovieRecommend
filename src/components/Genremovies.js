

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './m'; 
import '../css/GenreMovies.css'; 
import { Helmet } from 'react-helmet';


const GenreMovies = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [sortOption, setSortOption] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16',
            with_genres: id,
            sort_by: sortOption,
            page: page,
          },
        });
        setMovies(response.data.results);
        setError(null); 
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setError('Failed to fetch movies');
      }
    };

    fetchMovies();
  }, [id, sortOption, page]);

  useEffect(() => {
    const fetchGenreName = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16',
          },
        });
        const genre = response.data.genres.find(genre => genre.id === parseInt(id));
        setGenreName(genre ? genre.name : 'Genre');
        setError(null); 
      } catch (error) {
        console.error('Failed to fetch genre name:', error);
        setError('Failed to fetch genre name');
      }
    };

    fetchGenreName();
  }, [id]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <>
    <Helmet>
        <title>{genreName} Movies </title>
        <meta name="description" content="This is my React application" />
        <meta property="og:title" content="Movie Clone" />
        <meta property="og:description" content="This is my React application" />
      </Helmet>
         <div className="genre-movies">
      <h2 className='genre-name-title'>{genreName} </h2>
      <p className='genre-name-below'>MOVIES</p>
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="popularity.desc">Popularity</option>
        <option value="vote_average.desc">Votes Average</option>
        <option value="title.asc">Title</option>
        <option value="release_date.desc">Release Date</option>
      </select>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          !error && <p>No movies found for this genre.</p>
        )}
        {error && <p className="error-message">{error}</p>}
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
    </>
  );
};

export default GenreMovies;
