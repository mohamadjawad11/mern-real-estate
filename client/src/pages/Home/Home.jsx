import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../../components/ListingItem/ListingItem.jsx';
import './Home.css';
import next_icon from '../../assets/images/next-icon.png'
import back_icon from '../../assets/images/back-icon.png'
import user_1 from '../../assets/images/user-1.png'
import user_2 from '../../assets/images/user-2.png'
import user_3 from '../../assets/images/user-3.png'
import user_4 from '../../assets/images/user-4.png'
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
        console.log("Rent Listings:", data); // 👈 add this
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
        console.log("Sell Listings:", data); // 👈 add this
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const slider=useRef();
  const next_btn=useRef();
  const back_btn=useRef();
  let tx=0;

  const handleMouseDown = () => {
    next_btn.current.style.backgroundColor = '#0b1258'; 
  };
  
  const handleMouseUp = () => {
    next_btn.current.style.backgroundColor = ''; 
  };

  const handleMouseDown2 = () => {
    back_btn.current.style.backgroundColor = '#0b1258'; 
  };
  
  const handleMouseUp2 = () => {
    back_btn.current.style.backgroundColor = ''; 
  };


  const slideForward = () => {
    if (tx > -50) {
      tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;

  };

  const slideBackward=()=>{
    if(tx <0){
      tx+=25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  }


  return (
    <div className='home-container'>
      {/* top section */}
     <div className="hero-container">
  <div className="hero-content">
    {/* Left Side: Text */}
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

    {/* Right Side: Image */}
    <div className="hero-image">
      <img src={homeimg} alt="Real estate view" />
    </div>
  </div>
</div>



<div className='testimonials-header'>
    <h1>Our Testimonials</h1>
        </div>

 <div className='testimonials'>
      <img src={next_icon} alt='' className='next-btn' onClick={slideForward} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} ref={next_btn}/>
      <img src={back_icon} alt='' className='back-btn' onClick={slideBackward} onMouseUp={handleMouseUp2} onMouseDown={handleMouseDown2} ref={back_btn}/>

      <div className='slider'>

        <ul ref={slider}>
        <li>
  <div className='slide'>
    <div className='user-info'>
      <img src={user_1} alt='' />
      <div>
        <h3>Katy Jackson</h3>
        <span>Educity, USA</span>
      </div>
    </div>
    <p>William Jackson here! Studying at Edusity has been a transformative experience. The professors are incredibly knowledgeable, and the campus environment fosters both personal and academic growth.</p>
  </div>
    </li>

    <li>
  <div className='slide'>
    <div className='user-info'>
      <img src={user_2} alt='' />
      <div>
        <h3>Mike Loren</h3>
        <span>Educity, USA</span>
      </div>
    </div>
    <p>Emily Williams speaking! Edusity has provided me with endless opportunities to explore my passions. The hands-on learning approach and collaborative projects have prepared me for real-world challenges.</p>
  </div>
    </li>

    <li>
  <div className='slide'>
    <div className='user-info'>
      <img src={user_3} alt='' />
      <div>
        <h3>Emily Williams</h3>
        <span>Educity, USA</span>
      </div>
    </div>
    <p>Mike Loren here! The diversity and inclusivity at Edusity are unparalleled. I’ve made lifelong friends and connections while gaining a world-class education that has set me up for success.</p>
  </div>
    </li>

    <li>
  <div className='slide'>
    <div className='user-info'>
      <img src={user_4} alt='' />
      <div>
        <h3>Jackson Pedro</h3>
        <span>Educity, USA</span>
      </div>
    </div>
    <p>Jackson Pedro reporting! Edusity’s innovative curriculum and cutting-edge resources have allowed me to thrive academically. I’m grateful for the mentorship and support I’ve received here.</p>
  </div>
        </li>
        </ul>

      </div>
</div>


      <div className="recent-listings">
        {offerListings && offerListings.length > 0 && (
          <div className="listing-section">
            <div className="listing-header">
              <h2 className="listing-title">Recent offers</h2>
              <Link className="listing-link" to={'/search?offer=true'}>
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

        {rentListings && rentListings.length > 0 && (
          <div className="listing-section">
            <div className="listing-header">
              <h2 className="listing-title">Recent places for rent</h2>
              <Link className="listing-link" to={'/search?type=rent'}>
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

        {saleListings && saleListings.length > 0 && (
          <div className="listing-section">
            <div className="listing-header">
              <h2 className="listing-title">Recent places for sale</h2>
              <Link className="listing-link" to={'/search?type=sell'}>
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
