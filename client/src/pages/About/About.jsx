import React from 'react';
import './About.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function About() {
  return (
    <div className="about-section5">
      <div className="contact-container5">
        <div className="contact-left5">
          <h2>Get In Touch</h2>
          <p className="subtext5">
            We're here to help. Contact us for any inquiries or assistance.
          </p>

          <div className="contact-info5">
            <div className="info-item5">
              <FaPhoneAlt className="icon5" />
              <div>
                <h4>PHONE</h4>
                <p>+00 110 111 00</p>
              </div>
            </div>
            <div className="info-item5">
              <FaEnvelope className="icon5" />
              <div>
                <h4>EMAIL</h4>
                <p>info@example.com</p>
              </div>
            </div>
            <div className="info-item5">
              <FaMapMarkerAlt className="icon5" />
              <div>
                <h4>LOCATION</h4>
                <p>123 Main St, Your City, Country</p>
              </div>
            </div>
          </div>

          <div className="social-icons5">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>

        <div className="contact-right5">
          <form className='my-form5'>
            <div className="form-row5">
              <input className='my-input' type="text" placeholder="Your Name" required />
              <input  className='my-input' type="email" placeholder="Email" required />
            </div>
            <input className='my-input' type="text" placeholder="Subject" required />
            <textarea className='my-textarea' placeholder="Say Something" rows="7" required></textarea>
            <button className='btn5' type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
