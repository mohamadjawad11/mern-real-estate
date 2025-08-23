// import React, { useEffect } from 'react';
// import { FcGoogle } from 'react-icons/fc';
// import './OAuth.css';
// import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
// import { app } from '../../firebase';
// import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../../redux/user/userSlice';
// import { useNavigate } from 'react-router-dom';

// export default function OAuth() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const auth = getAuth(app);
//   const provider = new GoogleAuthProvider();

//   // Handle the redirect result when using mobile
//   useEffect(() => {
//     getRedirectResult(auth)
//       .then(async (result) => {
//         if (result) {
//           const res = await fetch('/api/auth/google', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               name: result.user.displayName,
//               email: result.user.email,
//               photo: result.user.photoURL,
//             }),
//           });
//           const data = await res.json();
//           dispatch(signInSuccess(data));
//           navigate('/');
//         }
//       })
//       .catch((error) => {
//         console.log('Redirect sign-in error:', error);
//       });
//   }, [auth, dispatch, navigate]);

//   const handleGoogleClick = async () => {
//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//     try {
//       if (isMobile) {
//         // Redirect flow for mobile
//         await signInWithRedirect(auth, provider);
//       } else {
//         // Popup flow for desktop
//         const result = await signInWithPopup(auth, provider);
//         const res = await fetch('/api/auth/google', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             name: result.user.displayName,
//             email: result.user.email,
//             photo: result.user.photoURL,
//           }),
//         });
//         const data = await res.json();
//         dispatch(signInSuccess(data));
//         navigate('/');
//       }
//     } catch (error) {
//       console.log('Could not sign in with Google:', error);
//     }
//   };

//   return (
//     <div className="oauth-container">
//       <button className="google-button" type='button' onClick={handleGoogleClick}>
//         <FcGoogle className="google-icon" />
//         Sign in with Google
//       </button>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import './OAuth.css';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [showAlert, setShowAlert] = useState(false);

  // Detect in-app browser (Instagram, Facebook, Messenger)
  const isInAppBrowser = () => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return (
      ua.includes('FBAN') ||
      ua.includes('FBAV') ||
      ua.includes('Instagram') ||
      ua.includes('Line') ||
      ua.includes('WhatsApp') ||
      ua.includes('Messenger')
    );
  };

  // Handle the redirect result when using mobile
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            }),
          });
          const data = await res.json();
          dispatch(signInSuccess(data));
          navigate('/');
        }
      })
      .catch((error) => {
        console.log('Redirect sign-in error:', error);
      });
  }, [auth, dispatch, navigate]);

  const handleGoogleClick = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isInAppBrowser()) {
      setShowAlert(true);
      return;
    }

    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        });
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log('Could not sign in with Google:', error);
    }
  };

  return (
    <div className="oauth-container">
      {showAlert && (
        <div className="browser-alert">
          <p>Google Sign-In is not supported in this browser.</p>
          <p>Please open this page in Safari or Chrome.</p>
          <div className="alert-buttons">
            <button onClick={() => window.open(window.location.href, '_blank')}>Open in Safari</button>
            <button onClick={() => window.open(window.location.href, '_blank')}>Open in Chrome</button>
          </div>
          <span className="close-alert" onClick={() => setShowAlert(false)}>×</span>
        </div>
      )}
      <button className="google-button" type="button" onClick={handleGoogleClick}>
        <FcGoogle className="google-icon" />
        Sign in with Google
      </button>
    </div>
  );
}

