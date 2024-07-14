import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? (
    <>
      <Navbar />
      <Component />
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
