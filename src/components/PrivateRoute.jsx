import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AppContext);
  if (!isAuthenticated) {
    localStorage.setItem('redirectPath', window.location.pathname);
  }
  return isAuthenticated ? element : <Navigate to='/signin' />;
};

export default PrivateRoute;
