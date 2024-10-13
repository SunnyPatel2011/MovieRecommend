import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './m';
import '../css/Topsearch.css';

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16', // Replace with your actual API key
            query: query,
          },
        });
        setResults(response.data.results);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <div className="movie-list">
        {/* {(r = 0) && <div><p>Sorry no such movie found</p>  <br />  <button onClick={redirect(-1)}> home </button></div>} */}
        { results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))  }
      </div>
    </div>
  );
};

export default SearchResults;
