import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCamera } from "react-icons/ci";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { addUserToFirestore } from '../Firebase/AddUserToFirestore';
import titleCar from '../assets/images/titleCar.png';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { RiEyeCloseFill } from 'react-icons/ri';


function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const defaultProfilePic = 'https://res.cloudinary.com/duaxitxph/image/upload/v1730489678/fvnlm4dqusnv4il9ee00.webp';

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!name, !email, !password) {
        return toast.error('all Inputs should be filled')
      }
      const { user } = await createUserWithEmailAndPassword(auth, email, password);;
      const profileImage = defaultProfilePic;
      await updateProfile(user, {
        displayName: name,
        photoURL: profileImage
      });
      await addUserToFirestore(user.uid, { email, password, name, profileImage });
    } catch (error) {
      return toast.error("Failed to sign up", error);
    }
  };

  return (
    <div className="h-screen max-h-[1200px] flex items-center justify-evenly relative bg-[#FAB76E] text-black w-[100vw] overflow-hidden max-w-[1500px]">
      <img src={titleCar} alt="titleCar" className='absolute z-50 left-[8%] w-[50%]' />
      <div className='w-[50%] h-screen max-h-[1200px] bg-[#080808]'
        style={{
          clipPath: "polygon(0 0, 100% 0, 75% 100%, 0 100%)",
        }}>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-[#D27007] text-[37px] font-[cursive] text-center font-bold mt-[15px] '>BOOST</h1>
          <p className='text-white  text-center leading-5'>__ It doesn't Run fast; it Fly slowly __</p>
        </div>

      </div>
      <div className='w-[50%] flex flex-col items-end justify-center  pr-[5%]'>
        <div className='relative w-[350px] '>
          <div className='w-[100px] h-[100px] bg-[#611723] rounded-full absolute top-[-30px] right-[-30px] '></div>
          <div className='w-[100px] h-[100px] bg-[#000000] rounded-full absolute bottom-[-30px] left-[-30px] '></div>

        <div className="w-full p-[30px] rounded-lg shadow-lg  "
          style={{
            background: '#ffe2c259',
            boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(8.7px)'
          }}>
          <div className='flex justify-between items-center '>

            <h2 className="text-3xl font-semibold text-center">Sign Up</h2>
            <div className="flex gap-2 items-center relative">
              <label className="flex w-[80px] h-[80px] justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition duration-300">
                <span className="text-gray-700 text-center text-[30px]"><CiCamera /></span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {selectedImage && (
                <div className="absolute left-[2px] pointer-events-none">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-[75px] h-[75px] object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSignup} className="space-y-[30px]">
            {/* <div className='flex gap-5'> */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-0 h-[30px]  bg-transparent focus:outline-none border-b-2 border-[black]"
              />

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-0 h-[30px]  bg-transparent focus:outline-none border-b-2 border-[black]"
                />
              
            {/* </div> */}
            <div className='relative flex items-center'>

            <input
              type={passwordVisible?'text':'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-0 h-[30px]  bg-transparent focus:outline-none border-b-2 border-[black]"
            />
            <div className='absolute right-2 cursor-pointer' onClick={()=>{
              setPasswordVisible(!passwordVisible)
            }}>
              {passwordVisible? <IoMdEye/> :<RiEyeCloseFill />}
            </div>
</ div>
            <button
              type="submit"
              className="w-full p-3 mt-4 font-semibold text-white rounded-md bg-[black] hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </form>
          <p className="text-gray-400 mt-4 text-center">
            Already have an account? <Link to="/login" className="text-black hover:underline">Login</Link>
          </p>
        </div>
        </div>

      </div>

    </div>
  );
}

export default Signup;
