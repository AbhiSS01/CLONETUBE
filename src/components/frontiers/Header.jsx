import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import SearchSuggestions from '../pages/SearchSuggestion';
import '../../styles/components/header.css';
import { FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme(); 
  const searchContainerRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    setSearchQuery(suggestionText);
    setShowSuggestions(false);
    navigate(`/search/${suggestionText}`);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <div className="logo" onClick={() => navigate('/')}>
          <i className="fab fa-youtube"></i>
          <span>CloneTube</span>
        </div>
      </div>
      
      <div className="search-container" ref={searchContainerRef}>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(e.target.value.trim() !== '');
            }}
            onFocus={() => setShowSuggestions(searchQuery.trim() !== '')}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
        {showSuggestions && (
          <SearchSuggestions 
            query={searchQuery} 
            onSuggestionClick={handleSuggestionClick} 
          />
        )}
      </div>
      
      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
        <button className="create-button">
          <i className="fas fa-video"></i>
        </button>
        <button className="profile-button">
          <img src="https://yt3.ggpht.com/yti/ANjgQV8rV5BrlAiiqVcBySmk1VyP3W0m9V-sixQqvp0SDnlrFKY=s108-c-k-c0x00ffffff-no-rj" alt="Profile" />
        </button>
      </div>
    </header>
  );
};

export default Header;