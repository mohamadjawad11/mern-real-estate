import React, { useRef, useState } from 'react';
import './About.css';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function About() {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });

  const sendEmail = (e) => {
    e.preventDefault();

   emailjs.sendForm(
      'service_hh6cxdd',       
      'template_nn45g0h',       
      form.current,
      'R7wov8wBSFe35AJlN'  
    )
    .then((result) => {
      setStatusMessage({ text: 'Your message has been sent successfully!', isError: false });
      console.log(result.text);
      setTimeout(() => setStatusMessage(""), 3000);
    }, (error) => {
      setStatusMessage({ text: 'Failed to send message. Please try again later.', isError: true });
      console.log(error.text);
    });

    e.target.reset();
  };

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
                <p>+961 78 958 764</p>
              </div>
            </div>
            <div className="info-item5">
              <FaEnvelope className="icon5" />
              <div>
                <h4>EMAIL</h4>
                <p>hamdanjawad789@gmail.com</p>
              </div>
            </div>
            <div className="info-item5">
              <FaMapMarkerAlt className="icon5" />
              <div>
                <h4>LOCATION</h4>
                <p>Ghobeiry, Beirut, Lebanon</p>
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
          <form className="my-form5" ref={form} onSubmit={sendEmail}>
            <div className="form-row5">
              <input className="my-input" type="text" name="name" placeholder="Your Name" required />
              <input className="my-input" type="email" name="email" placeholder="Email" required />
            </div>
            <input className="my-input" type="text" name="title" placeholder="Subject" required />
            <textarea className="my-textarea" name="message" placeholder="Say Something" rows="7" required></textarea>
            <button className="btn5" type="submit">Send Message</button>
            {statusMessage.text && (
              <p
                style={{
                  marginTop: '10px',
                  color: statusMessage.isError ? 'red' : 'green',
                  fontWeight: '500'
                }}
              >
                {statusMessage.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
