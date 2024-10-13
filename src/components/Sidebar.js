
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../css/Sidebar.css';
import logoImage from '../logo.svg';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onSidebarToggle }) => {
  const [genres, setGenres] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1000);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: '8deb5744491f87ca02e176e8ebe02f16',
          },
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onSidebarToggle(!isSidebarOpen);
  };

  const checkScreenWidth = () => {
    if (window.innerWidth > 1000) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  const navigate = useNavigate()

  return (
    <>
      <button className={`menu-button ${isSidebarOpen ? 'hide' : ''}`} onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'show' : 'hide'}`}>
        {window.innerWidth <= 1000 && isSidebarOpen && (
          <button className="cancel-button" onClick={toggleSidebar}>
            ✕
          </button>
        )}
        <img className='sideimg' src={logoImage} alt="Logo"  onClick={ () => navigate ( "/discover/popular" )}/>
        <h2>Discover</h2>
        <ul className='sidebar-list'>
          <li><NavLink to="/discover/popular" activeclassname="active"><i className="fas fa-heart"></i> &nbsp;&nbsp;Popular</NavLink></li>
          <li><NavLink to="/discover/top_rated" activeclassname="active"><i className="fas fa-star"></i>&nbsp;&nbsp; Top Rated</NavLink></li>
          <li><NavLink to="/discover/upcoming" activeclassname="active"><i className="fas fa-calendar-alt"></i> &nbsp;&nbsp;Upcoming</NavLink></li>
        </ul>
        <h2>Genres</h2>
        <ul className='sidebar-list'>
          {genres.map((genre) => (
            <li key={genre.id}>
              <NavLink to={`/genre/${genre.id}`} activeclassname="active"><i className="fas fa-film"></i>&nbsp;&nbsp; {genre.name}</NavLink>
            </li>
          ))}
        </ul>
        {/* <div className='extra'>
          <a target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/fidalgodev" className="sc-bZQynM dmXlzG"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee" /><span>Buy me a coffee</span></a>
          <p> Copyright ©<a href="https://www.github.com/fidalgodev" >Fidalgo</a></p>
          <center><img src='https://movies.fidalgo.dev/static/media/tmdb.0f4a7f74.svg' className='symbol' alt="TMDB" /></center>
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;