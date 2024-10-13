
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/PersonDetail.css';
import MovieCard from './m';
import { Helmet } from 'react-helmet';
import GIFs from '../1490.gif';

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState('popularity.desc');


  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${id}`, {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16',
          },
        });
        setPerson(response.data);
      } catch (error) {
        console.error('Failed to fetch person:', error);
      }
    };

    fetchPerson();
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16',
            with_cast: id,
            sort_by: sortOption,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, [id, sortOption]);

  if (!person) 
  return <div>
    <img src={GIFs} alt='GIf'  className='gifloader'/>
  </div>;

  return (

    <div className="person-detail">
        <Helmet>
        <title>{person.name}</title>
        <meta name="description" content="This is my React application" />
        <meta property="og:title" content="Movie Clone" />
        <meta property="og:description" content="This is my React application" />
      </Helmet>
      <div className='actor-whole'>
      <div className='actor-img'>
      <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} />
      </div>
      <div className='actor-details'>
      <h1>{person.name}</h1>
      <p>{person.birthday}</p>
      <br />
      <h3>The Biography</h3>
      <p>{person.biography}</p>
      <div className="buttons">
        {person.homepage && <a href={person.homepage} target="_blank" rel="noopener noreferrer" className="button">Website</a>}
        {person.imdb_id && <a href={`https://www.imdb.com/name/${person.imdb_id}`} target="_blank" rel="noopener noreferrer" className="button">IMDb</a>}
        <button onClick={() => navigate(-1)} className="button">Back</button>
      </div>
      </div>
      </div>
      <div className="movies-section">
        <h2>Also Enters In</h2>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Votes Average</option>
          <option value="title.asc">Title</option>
          <option value="release_date.desc">Release Date</option>
        </select>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
