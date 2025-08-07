import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaPinterestP, FaEnvelope,FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo & Description */}
        <div className="footer-box">
          <h2 className="footer-logo">
            Real<span>Estate</span>
          </h2>
          <p>
            Subscribe to our channel to stay updated with the latest tutorials and web development tricks.
          </p>
        </div>

        {/* Office Info */}
        <div className="footer-box">
          <h3>Office</h3>
          <p>ITPL Road</p>
          <p>Ghobeiry, Beirut, Lebanon</p>
          <p>PIN 560066</p>
          <p>Email: hamdanjawad789@gmail.com</p>
          <p>Phone: +961 78 958 764</p>
        </div>

        {/* Links */}
        <div className="footer-box">
          <h3>Links</h3>
          <ul>
        <Link to={'/'}><li>Home</li></Link>    
            <Link to={'/about'}><li>About us</li></Link>
            <Link to={'/about'}><li>Contact Us</li></Link>
            <Link to={'search'}><li>Properties</li></Link>
            <Link to={'/my-listings'}><li>Your Listings</li></Link>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-box">
          <h3>Newsletter</h3>
          <form className="newsletter-form">
            <FaEnvelope className="email-icon" />
            <input type="email" placeholder="Enter your email" required />
            <button type="submit"><FaArrowRight/></button>
          </form>
          <div className="footer-socials">
            <FaFacebookF />
            <FaTwitter />
            <FaWhatsapp />
            <FaPinterestP />
          </div>
        </div>
      </div>
      <p className="footer-bottom">© Mohammad Jawad Hamdan | All Rights Reserved</p>
    </footer>
  );
}
