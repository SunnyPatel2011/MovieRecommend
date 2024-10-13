import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultimage from '../nothing.svg';
import '../css/m.css';

const MovieCard = ({ movie }) => {
  // https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const [showTooltip, setShowTooltip] = useState(false);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        const fractionalPart = rating % 1;
        stars.push(
          <span
            key={i}
            className="star"
            style={{
              background: `linear-gradient(90deg, #f5c518 ${fractionalPart * 100}%, #ccc ${fractionalPart * 100}%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ★
          </span>
        );
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }
    return stars;
  };

  const handleMouseEnter = () => {
    setShowTooltip(false);
    setTimeout(() => setShowTooltip(true), 1200);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
      <div className="movie-card">
              <Link to={`/movie/${movie.id}`}>
        {/*eslint-disable-next-line*/}
              <img src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : defaultimage }  />

      <h3 className='movie-card-title'>{movie.title}</h3>
      <div 
        className="rating"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {renderStars(movie.vote_average / 2)}
        {showTooltip && (
          <div className="tooltip">
            {movie.vote_average} average rating on {movie.vote_count} votes
          </div>
        )}
      </div>
      </Link>
    </div>
  );
};

export default MovieCard;
