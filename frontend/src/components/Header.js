import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaLinkedin, 
  FaSearch, 
  FaUser,
  FaSignOutAlt,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user?._id}`);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You can implement actual theme switching logic here
    document.body.classList.toggle('dark-mode');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-logo">
            <FaLinkedin />
          </Link>
          
          <form onSubmit={handleSearch} className="header-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>
        </div>

        <div className="header-right">
          <div className="profile-section">
            <button className="theme-btn" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <div className="profile-icon" onClick={handleProfileClick}>
              <FaUser />
              <span className="profile-name">{user?.firstName} {user?.lastName}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 