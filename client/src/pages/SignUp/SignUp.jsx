import { useState } from "react";
import React from "react";
import "./SignUp.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import photo1 from "../../assets/images/photo1.avif";
import { Link } from "react-router-dom";


export default function SignUp() {
  const[formData, setFormData] = useState({})
   

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault(); 

  if (formData.password !== formData.repeatpassword) {
    alert("Passwords do not match");
    return;
  }

  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  console.log(data);
};

  console.log("Sending form data:", formData);

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="signup-left">
          <img
            className="signup-image-full"
            src={photo1}
            alt="Signup Visual"
          />
        </div>
        <div className="signup-right">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="text" placeholder="Your username" id="username" onChange={handleChange} />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="email" placeholder="your email" id="email" onChange={handleChange} />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" placeholder="Repeat Password" id="repeatpassword" onChange={handleChange} />
            </div>
            <button className="signup-button" type="submit">
              Sign Up
            </button>
          </form>
          <div className="divider">
            <span>or</span>
          </div>
          <button className="google-button">
            <FcGoogle className="icon google-icon" /> Google
          </button>
          <p className="login-link">
            Already have an account?<Link to={"/signin"}><a>Log In</a></Link>
          </p>
        </div>
      </div>
    </div>
  );
}