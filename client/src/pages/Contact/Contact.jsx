import React, { useState, useEffect } from 'react';
import * as emailjs from '@emailjs/browser';

import './Contact.css';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
const [error, setError] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

 useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/contact/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const templateParams = {
      listing_name: listing.name,
      user_message: message,
      from_name: 'Interested User', // you can use currentUser.username if available
      to_email: landlord.email,
    };

    try {
      const res = await emailjs.send(
        'service_ssgt7ft',
        'template_xnbweug',
        templateParams,
        'R7wov8wBSFe35AJlN'
      );

      if (res.status === 200) {
        setSuccess(true);
        setMessage('');
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send message. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <>

      {landlord && (
        
        <div className="contact-container">
        {success && <p className="success-msg">Message sent successfully!</p>}
        {error && <p className="error-msg">{error}</p>}
          <p>
            Contact <span>{landlord.username}</span> for{' '}
            <span>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            placeholder="Enter your Message here"
            rows={2}
            value={message}
            onChange={onChange}
          ></textarea>
         <button onClick={handleSend} className='contact-button'>Send Message</button>
        </div>
        
      )}
    </>
  );
}
//service_ssgt7ft
