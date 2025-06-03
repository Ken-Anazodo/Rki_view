import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RequireNoAuth = () => {

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	// Alternative: check token or cookie
	// const token = Cookies.get("access_token") || Cookies.get("your_jwt_cookie");
	// const isAuthenticated = Boolean(token);

  return isAuthenticated? <Navigate to="/dashboard/" replace/> : <Outlet />
}

export default RequireNoAuth;