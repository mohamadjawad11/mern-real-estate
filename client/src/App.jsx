import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Header from '../src/components/Header/Header.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import CreateListing from './pages/CreateListing/CreateListing.jsx';
import MyListings from './pages/MyListings/MyListings.jsx';
import UpdateListing from './pages/UpdateListing/UpdateListing.jsx';
import Listing from './pages/Listing/Listing.jsx';
//fxqc uzcz jfgv nthu

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route  element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        
        
        </Route>
        
        
        
        
      </Routes>
    </BrowserRouter>
  );
}
