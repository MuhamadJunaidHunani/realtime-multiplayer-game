import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({ element }) => {
  const { currentUser, currentUserLoading } = useSelector((state)=>state.currentUser);

  if (currentUserLoading) return <Loader/>;  

  return currentUser ? element : <Navigate to="/login" />;  
};

export default PrivateRoutes;
