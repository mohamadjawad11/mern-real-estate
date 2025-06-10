import { useState } from "react";
import React from "react";
import "./SignIn.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import photo2 from "../../assets/images/photo2.avif";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signInStart,signInSuccess,signInfailure } from "../../redux/user/userSlice";
import OAuth from "../../components/OAuth/OAuth";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[formData, setFormData] = useState({})
const { loading, error } = useSelector((state) => state.user);
  const [success, setSuccess] = useState(null);

   
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInfailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      setSuccess("User signed in successfully!");
      navigate('/');
   
    } catch (error) {
      dispatch(signInfailure(error.message));
    }
  };

  console.log("Sending form data:", formData);
  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <div className="signin-left">
          <img
            className="signin-image-full"
            src={photo2}
            alt="Login Visual"
          />
        </div>
        <div className="signin-right">
          <h2>Sign In</h2>
          <form  onSubmit={handleSubmit} className="signin-form">
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="text"
                placeholder="Your email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <button className="signin-button" type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
          </button>
          <OAuth />

          </form>
          <p className="signup-link">
            Dont have an account? <Link to="/signup">Sign Up</Link>
          </p>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
      </div>
    </div>
  );
}
