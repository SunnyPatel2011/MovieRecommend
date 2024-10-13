import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchicon from '../search.png';
import movieData from '../myData.json';
import '../css/SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState('');
  const navigate = useNavigate();

  const movieList = movieData.map(movie => movie.title); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleMovieSelect = (e) => {
    const selected = e.target.value;
    console.log("movies",selected);
    if (selected && selected !== selectedMovie) {
      setSelectedMovie(selected);
      navigate(`/search/${selected}`); 
    }
  };


  return (
    <div className={`search-bar ${isOpen ? 'open' : ''}`}>
        
      <select onChange={handleMovieSelect} className="dropdown-menu" value={selectedMovie}>
        <option value="">Select a movie...</option>
        {movieList.map((movie, index) => (
          <option key={index} value={movie}>
            {movie}
          </option>
        ))}
      </select>


      <img src={searchicon} className="search-icon" onClick={() => setIsOpen(!isOpen)} alt='searchIcon'/>
      {isOpen && (
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      )}
    </div>
  );
};

export default SearchBar;
