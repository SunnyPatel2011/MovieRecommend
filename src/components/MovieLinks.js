import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/movielinks.css'
const MovieLinks = ({ homepage, imdbId, trailerKey }) => {
  const navigate = useNavigate();

  return (
    <div className="buttons">
      {homepage && <a href={homepage} target="_blank" rel="noopener noreferrer" className="button">Website</a>}
      {imdbId && <a href={`https://www.imdb.com/title/${imdbId}`} target="_blank" rel="noopener noreferrer" className="button">IMDb</a>}
      {trailerKey && <a href={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank" rel="noopener noreferrer" className="button">Trailer</a>}
      {/* <button onClick={() => navigate(-1)} className="button">Back</button> */}
    </div>
  );
};

export default MovieLinks;
