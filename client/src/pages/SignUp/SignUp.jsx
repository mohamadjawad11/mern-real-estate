// SignUp.jsx
import React from "react";
import "./SignUp.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import photo1 from "../../assets/images/photo1.avif";
import { Link } from "react-router-dom";

export default function SignUp() {
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
          <form className="signup-form">
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="email" placeholder="Your email" />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" placeholder="Password" />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" placeholder="Repeat Password" />
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