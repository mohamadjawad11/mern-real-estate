import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Contact({listing}) {

    const [landloard,setLandlord] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/contact/${listing.userRef}`);
                const data = await res.json();
                if (data.success) {
                    setLandlord(data.data);
                } else {
                    console.error('Failed to fetch landlord:', data.message);
                }
            } catch (error) {
                console.error('Error fetching landlord:', error);
            }
        };
        fetchLandlord();
    },[listing.userRef]);

  return (
    <>
        {landloard &&(
            <div>
                <p>Contact <span>{landloard.username}</span>
                for <span>{listing.name.toLowerCase()}</span></p>
                <textarea placeholder='Enter your Message here' rows={2} value={message} onChange={onChange}></textarea>
                <Link to={`mailto:${landloard.email}?subject=Regarding your listing: ${listing.name}&body=${message}`} >
                    Send Message
                </Link>
            </div>
        )}
    </>
  )
}
