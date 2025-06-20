import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Header from '../src/components/Header/Header.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import CreateListing from './pages/CreateListing/CreateListing.jsx';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route  element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        </Route>
        
        
        
        
      </Routes>
    </BrowserRouter>
  );
}
