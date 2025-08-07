import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice.js'; 

const AutoLogout = ({ children, timeout = 20 * 60 * 1000 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeoutId = useRef(null);

  const resetTimer = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(logout, timeout);
  };

  const logout = () => {
    localStorage.removeItem('user'); 
    dispatch(signOut());
    navigate('/'); 
  };

  useEffect(() => {
    const events = ['click', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    for (let event of events) {
      window.addEventListener(event, resetTimer);
    }

    resetTimer(); 

    return () => {
      for (let event of events) {
        window.removeEventListener(event, resetTimer);
      }
      clearTimeout(timeoutId.current);
    };
  }, []);

  return <>{children}</>; 
};

export default AutoLogout;
