import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MovieGenres.css';

const MovieGenres = ({ genres }) => {
  return (
    <div className="movie-genres">
      {genres.map((genre, index) => (
        <Link key={index} to={`/genre/${genre.id}`} className="genre-link">
         {genre.name}
        </Link>
      ))}
    </div>
  );
};

export default MovieGenres;
