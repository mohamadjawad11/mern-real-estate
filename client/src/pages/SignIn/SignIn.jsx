import { useState, useEffect } from "react";
import React from "react";
import "./SignIn.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import photo2 from "../../assets/images/photo2.avif";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInfailure } from "../../redux/user/userSlice";
import OAuth from "../../components/OAuth/OAuth";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [success, setSuccess] = useState(null);
  const [redirectMessage, setRedirectMessage] = useState('');


  useEffect(() => {
    if (location.state?.message) {
      setRedirectMessage(location.state.message);
      const timeout = setTimeout(() => setRedirectMessage(''), 5000);
      return () => clearTimeout(timeout);
    }
  }, [location.state]);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

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

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <div className="signin-left">
          <img className="signin-image-full" src={photo2} alt="Login Visual" />
        </div>
        <div className="signin-right">
          <h2>Sign In</h2>

         
          {redirectMessage && (
            <div className="redirect-warning" style={{ color: "red", marginBottom: "10px" }}>
              {redirectMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="text" placeholder="Your email" id="email" onChange={handleChange} />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>

            <p className="forgot-password-text">
              <Link to="/forgot-password">Forgot your password?</Link>
            </p>

            <button className="signin-button" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <OAuth />
          </form>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
      </div>
    </div>
  );
}


// import React, { useState, useEffect } from 'react';

// function UserList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // This function runs after the component mounts
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []); // Empty dependency array: runs only once after the component mounts

//   if (loading) {
//     return <p>Loading users...</p>;
//   }

//   return (
//     <ul>
//       {users.map((user) => (
//         <li key={user.id}>{user.name}</li>
//       ))}
//     </ul>
//   );
// }

// export default UserList;
