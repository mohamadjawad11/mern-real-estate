import React from 'react';
import './Header.css';
import { Link,useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';



export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();
  const fallbackAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    
  }

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


          <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/my-listings">Your Listings</Link></li>
          <li><Link to="/search">Find Listing</Link></li>
          <li><Link to="/create-listing">Create Listing</Link></li>
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
