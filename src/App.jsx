import React, { useEffect, useState } from "react";
import './App.css';
import Controls from "./Components/Controls";
import GameArea from "./Components/GameArea";
import Test from "./Components/Test";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import PublicRoutes from "./AuthRouting/PublicRoutes";
import PrivateRoutes from "./AuthRouting/PrivateRoutes";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/Firebase";
import { setcurrentUser, setcurrentUserLoading } from "./Redux/Slices/CurrentUser.slice";


const App = () => {

  useEffect(() => {
    setcurrentUserLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setcurrentUser(user);
      } else {
        setcurrentUser(null);
      }
      setcurrentUserLoading(false);
    });
    
    return unsubscribe;
  }, []);

  function HomeRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
      navigate('/messages/1');
    }, [navigate]);

    return null;
  }
  const router = createBrowserRouter([
    { path: '/login', element: <PublicRoutes element={<Login />} /> },
    { path: '/signup', element: <PublicRoutes element={<Signup />} /> },
    { path: '/messages/:id', element: <PrivateRoutes element={<GameArea />} /> },
    { path: '/', element: <PrivateRoutes element={<HomeRedirect />} /> },
    { path: '/test', element: <PrivateRoutes element={<Test />} /> },
  ]);


  {/* <div className="mainCont">
  <Controls speed={speed} distance={distance} />
  <GameArea setSpeed={setSpeed} setDistance={setDistance} />
</div> */}
  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer />
        <h1 className="text-red-50 text-[40px]">hello</h1>
    </>

  );
};

export default App;
