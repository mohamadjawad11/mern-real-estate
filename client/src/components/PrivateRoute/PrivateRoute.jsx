import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  // List of public routes that don't require login
  const publicRoutes = ['/signin', '/signup'];

  if (publicRoutes.includes(location.pathname)) {
    // Allow access to public routes even if not logged in
    return <Outlet />;
  }

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
