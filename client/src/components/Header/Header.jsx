import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function Header() {
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

        <nav>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
