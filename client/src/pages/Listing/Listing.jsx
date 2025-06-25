import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Listing.css';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const params = useParams();

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
    <main className="listing-container">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {listing && (
        <div className="listing-content">
          <div className="image-slider">
            {listing.imageUrls.map((url, idx) => (
              <img key={idx} src={url} alt={`Slide ${idx}`} className="slider-image" />
            ))}
            <div className="share-button" onClick={handleShare}>
              <FaShare />
            </div>
            {copied && <div className="copied-msg">Link copied!</div>}
          </div>

          <div className="listing-info">
            <h1>{listing.name} - ${Number(listing.offer ? listing.discountPrice : listing.regularPrice).toLocaleString()}</h1>
            <p className="address">
              <FaMapMarkerAlt className="location-icon" /> {listing.address}
            </p>
            <div className="tags">
              <span className={listing.type === 'rent' ? 'tag rent' : 'tag sale'}>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
              {listing.offer && (
                <span className="tag discount">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </span>
              )}
            </div>
            <p className="description">
              <strong>Description -</strong> {listing.description}
            </p>

            <ul className="features">
              <li><FaBed /> {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</li>
              <li><FaBath /> {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</li>
              <li><FaParking /> {listing.parking ? 'Parking spot' : 'No Parking'}</li>
              <li><FaChair /> {listing.furnished ? 'Furnished' : 'Unfurnished'}</li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
} 
