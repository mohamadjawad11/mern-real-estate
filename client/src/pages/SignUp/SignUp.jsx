// import { useState } from "react";
// import React from "react";
// import "./SignUp.css";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import photo1 from "../../assets/images/photo1.avif";
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import OAuth from "../../components/OAuth/OAuth";

// export default function SignUp() {
//   const navigate = useNavigate();
//   const[error, setError] = useState(null);
//   const[formData, setFormData] = useState({})
//   const [Loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);
  

   

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError(null);
//   setSuccess(null);

//   if (formData.password !== formData.repeatpassword) {
//     setError("Passwords do not match");
//     setLoading(false);
//     return;
//   }

//   try {
//     const res = await fetch('/api/auth/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();

//     if (data.success === false) {
//       setError(data.message);
//     } else {
//       setSuccess("User created successfully!");

//       // Navigate after 2 seconds
//       setTimeout(() => {
//         navigate("/signin");
//       }, 2000);
//     }

//   // eslint-disable-next-line no-unused-vars
//   } catch (err) {
//     setError("An unexpected error occurred.");
//   }

//   setLoading(false);
// };

//   console.log("Sending form data:", formData);

//   return (
//     <div className="signup-wrapper">
//       <div className="signup-card">
//         <div className="signup-left">
//           <img
//             className="signup-image-full"
//             src={photo1}
//             alt="Signup Visual"
//           />
//         </div>
//         <div className="signup-right">
//           <h2>Sign Up</h2>
//           <form onSubmit={handleSubmit} className="signup-form">
//             <div className="input-group">
//               <FaEnvelope className="icon" />
//               <input type="text" placeholder="Your username" id="username" onChange={handleChange} />
//             </div>
//             <div className="input-group">
//               <FaLock className="icon" />
//               <input type="email" placeholder="your email" id="email" onChange={handleChange} />
//             </div>
//             <div className="input-group">
//               <FaLock className="icon" />
//               <input type="password" placeholder="Password" id="password" onChange={handleChange} />
//             </div>
//             <div className="input-group">
//               <FaLock className="icon" />
//               <input type="password" placeholder="Repeat Password" id="repeatpassword" onChange={handleChange} />
//             </div>
//             <button disabled={Loading} className="signup-button" type="submit">
//               {Loading ? "Loading..." : "Sign Up"}
//             </button>
//              <div className="divider">
//             <span>or</span>
//           </div>
//           <OAuth />
//           </form>
         
          
//           <p className="login-link">
//             Already have an account?<Link to={"/signin"}><a>Log In</a></Link>
//           </p>
//           {error && <div className="error-message">{error}</div>}
//       {success && <div className="success-message">{success}</div>}
//         </div>
//       </div>


//     </div>
//   );
// }
import { useState } from "react";
import React from "react";
import "./SignUp.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import photo1 from "../../assets/images/photo1.avif";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth/OAuth";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.repeatpassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/request-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setSuccess("Verification code sent to your email.");
        localStorage.setItem("signupEmail", formData.email);
        setTimeout(() => {
          navigate("/verify-email");
        }, 1500);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="signup-left">
          <img className="signup-image-full" src={photo1} alt="Signup Visual" />
        </div>
        <div className="signup-right">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="text"
                placeholder="Your username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="email"
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
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Repeat Password"
                id="repeatpassword"
                onChange={handleChange}
              />
            </div>
            <button disabled={loading} className="signup-button" type="submit">
              {loading ? "Sending..." : "Sign Up"}
            </button>
            <div className="divider">
              <span>or</span>
            </div>
            <OAuth />
          </form>
          <p className="login-link">
            Already have an account?{" "}
            <Link to="/signin">
              <a>Log In</a>
            </Link>
          </p>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
      </div>
    </div>
  );
}
