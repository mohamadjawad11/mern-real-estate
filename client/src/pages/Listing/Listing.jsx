import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Listing.css';
import { useSelector } from 'react-redux';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import Contact from '../Contact/Contact.jsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const swiperRef = useRef();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await response.json();
        if (data.success === false) {
          setError('Listing not found');
        } else {
          setListing(data);
        }
        setLoading(false);
      } catch (error) {
        setError('Something went wrong');
        setLoading(false);
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [params.listingId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="listing-container4">
      {loading && <p className="loading4">Loading...</p>}
      {error && <p className="error4">{error}</p>}

      {listing && (
        <div className="listing-content4">
          <div className="image-slider4">
            <Swiper
              modules={[Navigation, Pagination]}
              loop={true}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="swiper4"
            >
              {listing.imageUrls.map((url, idx) => (
                <SwiperSlide key={idx}>
                  <img src={url} alt={`Slide ${idx}`} className="slider-image4" />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom arrows */}
            <div className="custom-arrow left" onClick={() => swiperRef.current.slidePrev()}>
              <FaArrowLeft />
            </div>
            <div className="custom-arrow right" onClick={() => swiperRef.current.slideNext()}>
              <FaArrowRight />
            </div>

            <div className="share-button4" onClick={handleShare}>
              <FaShare />
            </div>
            {copied && <div className="copied-msg4">Link copied!</div>}
          </div>

          <div className="listing-info4">
            <h1>
              {listing.name} -
              {listing.offer ? (
                <>
                  <span
                    style={{
                      textDecoration: 'line-through',
                      color: 'gray',
                      marginRight: '10px'
                    }}
                  >
                    ${Number(listing.regularPrice).toLocaleString()}
                  </span>
                  <span style={{ color: 'green', fontWeight: 'bold' }}>
                    ${Number(listing.discountedPrice).toLocaleString()}
                  </span>
                </>
              ) : (
                <span>${Number(listing.regularPrice).toLocaleString()}</span>
              )}
            </h1>

            <p className="address4">
              <FaMapMarkerAlt className="location-icon4" /> {listing.address}
            </p>

            <div className="tags4">
              <span className={listing.type === 'rent' ? 'tag4 rent4' : 'tag4 sale4'}>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
              {listing.offer && (
                <span className="tag4 discount4">
                  ${+listing.regularPrice - +listing.discountedPrice} OFF
                </span>
              )}
            </div>

            <p className="description4">
              <strong>Description -</strong> {listing.description}
            </p>

            <ul className="features4">
              <li>
                <FaBed /> {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}
              </li>
              <li>
                <FaBath /> {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}
              </li>
              <li>
                <FaParking /> {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li>
                <FaChair /> {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button className="contact-agent4" onClick={() => setContact(true)}>
                Contact Landlord
              </button>
            )}

            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
