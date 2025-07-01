import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaPinterestP, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Logo & Description */}
        <div className="footer-box">
          <h2 className="footer-logo">
            ✂<span>tyle</span>
          </h2>
          <p>
            Subscribe to our channel to stay updated with the latest tutorials and web development tricks.
          </p>
        </div>

        {/* Office Info */}
        <div className="footer-box">
          <h3>Office</h3>
          <p>ITPL Road</p>
          <p>Whitefield, Beirut, Lebanon</p>
          <p>PIN 560066</p>
          <p>Email: style.support@email.com</p>
          <p>Phone: +961 12345678</p>
        </div>

        {/* Links */}
        <div className="footer-box">
          <h3>Links</h3>
          <ul>
            <li>Home</li>
            <li>Services</li>
            <li>About Us</li>
            <li>Features</li>
            <li>Contacts</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-box">
          <h3>Newsletter</h3>
          <form className="newsletter-form">
            <FaEnvelope className="email-icon" />
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">→</button>
          </form>
          <div className="footer-socials">
            <FaFacebookF />
            <FaTwitter />
            <FaWhatsapp />
            <FaPinterestP />
          </div>
        </div>
      </div>
      <p className="footer-bottom">© 2025 Style | All Rights Reserved</p>
    </footer>
  );
}
