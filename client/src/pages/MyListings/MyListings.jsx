import './MyListings.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBed, FaBath } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';


export default function MyListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/display/listings/${currentUser._id}`, {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        if (!data.success || !Array.isArray(data.data)) {
          setError(true);
        } else {
          setUserListings(data.data);
        }
      } catch (error) {
        setError(true);
        console.error("❌ Failed to fetch listings:", error);
      }
    };

    fetchListings();
  }, [currentUser._id]);

  const handleListingDelete = async (listingId) => {
    try{
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success) {
        setUserListings((prev)=>prev.filter((listing)=>listing._id !== listingId));
      } else {
        console.error("❌ Failed to delete listing:", data.message);
      }
    }catch(error){
      console.error("❌ Failed to delete listing:", error.message);
      
    }
  }

  return (
    <div className="my-listings-container">
      <h1 className="my-listings-title">Your Listings</h1>

      {error && (
        <p className="error-msg">Something went wrong loading listings.</p>
      )}

      {!error && userListings.length === 0 && (
        <p className="no-listings-msg">You have no listings yet.</p>
      )}

      <div className="listings-grid">
        {userListings.map((listing) => (
        <div key={listing._id} className="listing-card">
          <Link to={`/listing/${listing._id}`}>
          <img src={listing.imageUrls[0]} alt={listing.name} className="listing-img" />
        </Link>
<div className="listing-details">
  <h2 className="listing-name">{listing.name}</h2>
  <p className="listing-location">
    <MdLocationOn style={{ verticalAlign: 'middle', marginRight: '5px', color: '#555' }} />
    {listing.address}
  </p>

  {/* Truncated Description */}
  <p className="listing-description">
    {listing.description.length > 100
      ? listing.description.slice(0, 100) + '...'
      : listing.description}
  </p>

  <p className="listing-price">
    ${listing.offer ? listing.discountedPrice : listing.regularPrice}
    {listing.type === 'rent' && ' / month'}
    <span className={`type-badge ${listing.type === 'rent' ? 'rent' : 'sell'}`}>
    {listing.type === 'rent' ? 'Rent' : 'Sell'}
  </span>
  </p>

  <div className="listing-specs">
    <span><FaBed /> {listing.bedrooms} Beds</span>
    <span><FaBath /> {listing.bathrooms} Baths</span>
  </div>

  <div className="listing-actions">
    <Link to={`/update-listing/${listing._id}`} className="edit-btn">Edit</Link>
    <Link to={`/listing/${listing._id}`} className="view-btn">View</Link>
    <button onClick={()=>handleListingDelete(listing._id)} className="delete-btn">Delete</button>
    
  </div>
</div>

</div>

        ))}
      </div>
    </div>
  );
}
