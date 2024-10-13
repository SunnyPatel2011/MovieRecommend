import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MovieDetail from './pages/MovieDetail';
import MovieGrid from './components/MovieGrid';
import GenreMovies from './components/Genremovies';
import DiscoverMovies from './components/DiscoverMovies';
import PersonDetail from './components/PersonDetail';
import SearchResults from './components/Topsearch';
import SearchBar from './components/SearchBar';
import './styles.css';
import { Helmet } from 'react-helmet';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
       <Helmet>
        <title>Movie Clone</title>
        <meta name="description" content="This is my React application" />
        <meta property="og:title" content="Movie Clone" />
        <meta property="og:description" content="This is my React application" />
      </Helmet>
      <div className="app-container">
        <SearchBar setSearchResults={setSearchResults} />
        <Sidebar onSidebarToggle={handleSidebarToggle} />
        <div className={`main-content ${!isSidebarOpen ? 'full-width' : ''}`}>
          <Routes>
          <Route path="/" element={<Navigate to="/discover/popular" />} />

            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/movies" element={<MovieGrid />} />
            <Route path="/genre/:id" element={<GenreMovies />} />
            <Route path="/discover/:type" element={<DiscoverMovies />} />
            <Route path="/person/:id" element={<PersonDetail />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
