import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const fallbackAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const term = urlParams.get('searchTerm');
    if (term) {
      setSearchTerm(term);
    }
  }, [window.location.search]);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>
            <span className="logo-part1">Real</span>
            <span className="logo-part2">Estate</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search properties..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/search" onClick={() => setMenuOpen(false)}>Properties</Link></li>
          <li><Link to="/create-listing" onClick={() => setMenuOpen(false)}>Create Listing</Link></li>
          <li><Link to="/my-listings" onClick={() => setMenuOpen(false)}>Your Listings</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          
          
          
          <li>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              {currentUser && currentUser._id ? (
                <img
                  src={
                    currentUser.avatar
                      ? (currentUser.avatar.startsWith("http") || currentUser.avatar.startsWith("data:")
                        ? currentUser.avatar
                        : `http://localhost:3000${currentUser.avatar}`)
                      : fallbackAvatar
                  }
                  alt="profile"
                  className="profile-avatar"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="signin-text">SignIn</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
