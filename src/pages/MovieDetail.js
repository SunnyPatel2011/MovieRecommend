import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieInfo from '../components/MovieInfo';
import MovieGenres from '../components/MovieGenres';
import MovieOverview from '../components/Stars';
import CastList from '../components/CastList';
import defaultImage from '../nothing.svg';
import MovieLinks from '../components/MovieLinks';
import Recommendation from '../components/recommendation';
import '../css/MovieDetail.css';
import { Helmet } from 'react-helmet';
import GIF from '../1490.gif';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16',
            append_to_response: 'videos,alternative_titles'
          },
        });
        setMovie(response.data);
        setVideos(response.data.videos.results);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16',
          },
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error('Failed to fetch cast:', error);
      }
    };

    fetchCast();
  }, [id]);

  if (!movie) return <div>
    <img src={GIF} alt='GIF' className='gif-loader'/>
  </div>;
  

  const movieGenres = movie.genres ?? [];
  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  // const defaultImage = 'https://movies.fidalgo.dev/static/media/nothing.4c58037b.svg';
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    
    <>
     <Helmet>
        <title>{movie.title}</title>
        <meta name="description" content="This is my React application" />
        <meta property="og:title" content="Movie Clone" />
        <meta property="og:description" content="This is my React application" />
      </Helmet>
    <div className='whole-movie-details'>
    <div className='movie-detail-img'>
      <MovieInfo title={movie.title} posterPath={ movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : defaultImage }  />
      </div>
    <div className="movie-detail">
       <h3> THE GENRES</h3>
      <MovieGenres genres={movieGenres} />
      <MovieOverview overview={movie.overview} rating={movie.vote_average} />
      <div className="movie-extra-details">
        <p> {movie.original_language}   /    {movie.runtime} min       /
                 {new Date(movie.release_date).getFullYear()}
         </p>
      </div>
      <CastList cast={cast} />
      <MovieLinks
        homepage={movie.homepage}
        imdbId={movie.imdb_id}
        trailerKey={trailer?.key}
      />
      </div>
    </div>
      <div className='detail-recommendation'>
      <Recommendation movieId={id} />
    </div>
    </>
  );
};

export default MovieDetail;

