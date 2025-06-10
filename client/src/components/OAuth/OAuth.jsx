import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import './OAuth.css';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../../redux/user/userSlice'
import {useNavigate} from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const handleGoogleClick=async () => {
      
        try{
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res =await fetch('/api/auth/google',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
            
        }catch(error) {
            console.error("Error during Google OAuth:", error);
            

        }
    }
  return (
    <div className="oauth-container">
      <button className="google-button" type='button' onClick={handleGoogleClick}>
        <FcGoogle className="google-icon" />
        Sign in with Google
      </button>
    </div>
  );
}
