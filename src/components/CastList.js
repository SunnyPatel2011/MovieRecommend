import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CastList.css';

const CastList = ({ cast }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex < cast.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
        <h3> THE CAST</h3>
    <div className="cast-container">
      <button className="arrow-button" onClick={handlePrev} disabled={currentIndex === 0}>
        &lt;
      </button>
      <div className="cast-wrapper">
        <div
          className="cast-items"
          style={{ transform: `translateX(-${currentIndex * (50 + 10)/ 5 * 8}px)` }}
        >
          {cast.map(actor => (
            <div
              key={actor.cast_id}
              className="cast-item"
              onClick={() => navigate(`/person/${actor.id}`)}
            >
              <img
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://movies.fidalgo.dev/static/media/person.fdbc4613.svg' }
                alt={actor.name}
              />
            </div>
          ))}
        </div>
      </div>
      <button className="arrow-button" onClick={handleNext} disabled={currentIndex >= cast.length - 6}>
        &gt;
      </button>
    </div>
  </>
  );
};

export default CastList;