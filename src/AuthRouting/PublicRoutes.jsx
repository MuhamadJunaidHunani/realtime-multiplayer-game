import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { useSelector } from 'react-redux';
import { setcurrentUserLoading } from '../Redux/Slices/CurrentUser.slice';

const PublicRoutes = ({ element }) => {
  const { currentUser, currentUserLoading } = useSelector((state)=>state.currentUser);
  if (currentUserLoading) return<Loader/>;
  setcurrentUserLoading(false);

  return !currentUser ? element : <Navigate to="/" replace />;
};

export default PublicRoutes;
