import React, { useState, useEffect } from 'react';
import './Contact.css';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);

  const [message, setMessage] = useState('');

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

  return (
    <>

      {landlord && (
        
        <div className="contact-container">
        
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
          <a
            href={`mailto:${landlord.email}?subject=Regarding your listing: ${listing.name}&body=${encodeURIComponent(message)}`}
          >
            Send Message
          </a>
        </div>
        
      )}
    </>
  );
}
