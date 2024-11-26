import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const PublicRoutes = ({ element }) => {
  const { currentUser, currentUserLoading } = useSelector((state)=>state.currentUser);

  if (currentUserLoading) return<Loader/>;

  console.log("okkk");
  

  return !currentUser ? element : <Navigate to="/" replace />;
};

export default PublicRoutes;
