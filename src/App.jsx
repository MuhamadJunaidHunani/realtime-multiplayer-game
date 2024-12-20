import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import React, { useEffect } from "react";
import PublicRoutes from "./AuthRouting/PublicRoutes";
import PrivateRoutes from "./AuthRouting/PrivateRoutes";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/Firebase";
import { setcurrentUser, setcurrentUserLoading } from "./Redux/Slices/CurrentUser.slice";
import { useDispatch } from "react-redux";
import { FetchUsers } from "./Firebase/FetchUsers";
import { setUser, setUserLoading } from "./Redux/Slices/Users.slice";
import Leaderboard from "./Pages/LeaderBoard";
import Players from "./Pages/Players";
import Game from './Pages/Game';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setcurrentUserLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {
          uid,
          email,
          displayName,
          photoURL,
        } = user;
        dispatch(setcurrentUser({ uid, email, displayName, photoURL }));
        dispatch(setcurrentUserLoading(false));
      } else {
        dispatch(setcurrentUser(null));
        dispatch(setcurrentUserLoading(false));
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = FetchUsers((data) => {
      dispatch(setUser(data));
      dispatch(setUserLoading(false));
    });

    return () => unsubscribe();
  }, []);

  function HomeRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
      navigate('/players');
    }, [navigate]);

    return null;
  }
  const router = createBrowserRouter([
    { path: '/login', element: <PublicRoutes element={<Login />} /> },
    { path: '/signup', element: <PublicRoutes element={<Signup />} /> },
    { path: '/', element: <PrivateRoutes element={<HomeRedirect />} /> },
    { path: '/leader-board', element: <PrivateRoutes element={<Leaderboard />} /> },
    { path: '/players', element: <PrivateRoutes element={<Players />} /> },
    { path: '/game/:roomId', element: <PrivateRoutes element={<Game />} /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>

  );
};

export default App;
