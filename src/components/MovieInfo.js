import React from 'react';
import '../css/movieinfo.css';
import arrowImage from '../right-arrow.png';
import { useNavigate } from 'react-router-dom';

const MovieInfo = ({ title, posterPath }) => {
  const navigate =  useNavigate();
  
  return (
    <>
    <div className='headerImage'>
      <img src={arrowImage} onClick={() => navigate(-1)} alt='arrowIcon'/>
      <h1>{title}</h1>
    </div>
      <img className='details-img' src={posterPath} alt={title} />
    </>
  );
};

export default MovieInfo;
