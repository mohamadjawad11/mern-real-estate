import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../../components/ListingItem/ListingItem.jsx';
import './Home.css';

import homeimg from '../../assets/images/homeimage.avif'

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sell&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const testimonials = [
  {
    name: "Donald Jackman",
    role: "Content Creator",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    review:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: "Richard Nelson",
    role: "Instagram Influencer",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    review:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: "James Washington",
    role: "Marketing Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    review:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
];

  return (
    <div className='home-container'>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find your next <span className="highlight">perfect </span>
              place with ease
            </h1>
            <div className="hero-description">
              Sahand Estate is the best place to find your next perfect place to live.
              <br />
              We have a wide range of properties for you to choose from.
            </div>
            <Link to="/search" className="hero-link">
              Let's get started
            </Link>
          </div>
          <div className="hero-image">
            <img src={homeimg} alt="Real estate view" />
          </div>
        </div>
      </div>

      <div className='testimonials-header'>
        <h1>Our Testimonials</h1><br/>
      </div>

    <div className="testimonial-container">
      {testimonials.map((user, index) => (
        <div className="testimonial-card" key={index}>
          <div className="testimonial-header">
            <img className="testimonial-image" src={user.image} alt={user.name} />
            <div className="testimonial-name-role">
              <h1>{user.name}</h1>
              <p>{user.role}</p>
            </div>
          </div>
          <p className="testimonial-text">{user.review}</p>
          <div className="testimonial-stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="18"
                height="18"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                  fill="#FF532E"
                />
              </svg>
            ))}
          </div>
        </div>
      ))}
    </div>
      
      <div className="recent-listings">
        {offerListings.length > 0 && (
          <div className="listing-section">
            <div className="listing-header">
              <h2 className="listing-title">Recent offers</h2>
              <Link className="listing-link listing-link2" to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div>
            <div className="listing-grid">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings.length > 0 && (
          <div className="listing-section">
            <div className="listing-header">
              <h2 className="listing-title">Recent places for rent</h2>
              <Link className="listing-link listing-link2" to={'/search?type=rent'}>
                Show more places for rent
              </Link>
            </div>
            <div className="listing-grid">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings.length > 0 && (
          <div className="listing-section">
            <div className="listing-header">
              <h2 className="listing-title">Recent places for sale</h2>
              <Link className="listing-link listing-link2" to={'/search?type=sell'}>
                Show more places for sale
              </Link>
            </div>
            <div className="listing-grid">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}