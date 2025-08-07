// import { useSelector } from 'react-redux'
// import { Outlet,Navigate } from 'react-router-dom'
// export default function PrivateRoute() {
//     const { currentUser } = useSelector((state) => state.user)
//   return currentUser ? <Outlet /> : <Navigate to="/signin" />
    
  
// }

import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate
      to="/signin"
      replace
      state={{ from: location.pathname, message: 'You must log in to access this page.' }}
    />
  );
}
