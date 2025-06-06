import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<SignIn/>} />
        <Route path="/contact" element={<SignUp/>} />
        <Route path="/" element={<About/>} />
        <Route path="/" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}
