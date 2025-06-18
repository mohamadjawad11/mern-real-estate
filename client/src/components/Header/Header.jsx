import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';



export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  const fallbackAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>
            <span className="logo-part1">Real</span>
            <span className="logo-part2">Estate</span>
          </h1>
        </Link>

        <form className="search-form">
          <input
            type="text"
            placeholder="Search properties..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>

          <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li>
          <Link to="/profile">
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
