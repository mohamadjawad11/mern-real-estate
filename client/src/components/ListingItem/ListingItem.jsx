import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import './ListingItem.css';
import { FaBed, FaBath } from 'react-icons/fa';


export default function ListingItem({ listing }) {
  return (
    <div className="listing-card">
      <Link to={`/listing/${listing._id}`} className="listing-link">
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt="listing cover"
          className="listing-img"
        />
        <div className="listing-content">
          <p className="listing-title2">{listing.name}</p>
          <div className="listing-location">
            <MdLocationOn className="location-icon" />
            <p className="listing-address">{listing.address}</p>
                   <span className={`type-badge ${listing.type === 'rent' ? 'rent' : 'sell'}`}>
                  {listing.type === 'rent' ? 'Rent' : 'Sell'}
                </span>
          </div>
   
          <p className="listing-description">{listing.description}</p>
       <p className="listing-price">
  {listing.offer ? (
    <>
      <span style={{
        textDecoration: 'line-through',
        color: 'gray',
        marginRight: '8px',
        fontWeight: '500'
      }}>
        ${Number(listing.regularPrice).toLocaleString()}
      </span>
      <span style={{
        color: 'green',
        fontWeight: '700'
      }}>
        ${Number(listing.discountedPrice).toLocaleString()}
        {listing.type === 'rent' && ' / month'}
      </span>
    </>
  ) : (
    <span style={{ fontWeight: '600' }}>
      ${Number(listing.regularPrice).toLocaleString()}
      {listing.type === 'rent' && ' / month'}
    </span>
  )}
</p>

       <div className="listing-info">
  <span className="info-badge">
    <FaBed style={{ marginRight: '6px', verticalAlign: 'middle' }} />
    {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
  </span>
  <span className="info-badge">
    <FaBath style={{ marginRight: '6px', verticalAlign: 'middle' }} />
    {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
  </span>
  <Link to={`/listing/${listing._id}`} className="view-more-btn">
    View More
  </Link>
</div>

  

        </div>
      </Link>
    </div>
  );
}



