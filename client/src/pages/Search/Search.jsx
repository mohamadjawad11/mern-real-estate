import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../../components/ListingItem/ListingItem.jsx';
import './Search.css';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true',
        furnished: furnishedFromUrl === 'true',
        offer: offerFromUrl === 'true',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setShowMore(data.length > 8);
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    if (id === 'all' || id === 'rent' || id === 'sell') {
      setSidebardata({ ...sidebardata, type: id });
    } else if (id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: value });
    } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setSidebardata({ ...sidebardata, [id]: checked });
    } else if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(sidebardata);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
    const data = await res.json();
    setShowMore(data.length >= 9);
    setListings([...listings, ...data]);
  };

  return (
    <div className="search-container2">
      <div className="search-sidebar2">
        <form onSubmit={handleSubmit} className="search-form2">
          <div className="form-group2">
            <label>Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="form-group2">
            <label>Type:</label>
            <label><input type="checkbox" id="all" onChange={handleChange} checked={sidebardata.type === 'all'} /> All</label>
            <label><input type="checkbox" id="rent" onChange={handleChange} checked={sidebardata.type === 'rent'} /> Rent</label>
            <label><input type="checkbox" id="sell" onChange={handleChange} checked={sidebardata.type === 'sell'} /> Sale</label>
            <label><input type="checkbox" id="offer" onChange={handleChange} checked={sidebardata.offer} /> Offer</label>
          </div>
          <div className="form-group2">
            <label>Amenities:</label>
            <label><input type="checkbox" id="parking" onChange={handleChange} checked={sidebardata.parking} /> Parking</label>
            <label><input type="checkbox" id="furnished" onChange={handleChange} checked={sidebardata.furnished} /> Furnished</label>
          </div>
          <div className="form-group2">
            <label>Sort:</label>
            <select id="sort_order" onChange={handleChange} defaultValue="created_at_desc">
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button type="submit" className="search-button2">Search</button>
        </form>
      </div>
      <div className="search-results2">
        <h1>Listing Results:</h1>
        <div className="results-grid2">
          {!loading && listings.length === 0 && <p>No listing found!</p>}
          {loading && <p>Loading...</p>}
          {!loading && listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
          {showMore && (
            <button onClick={onShowMoreClick} className="show-more2">Show More</button>
          )}
        </div>
      </div>
    </div>
  );
}