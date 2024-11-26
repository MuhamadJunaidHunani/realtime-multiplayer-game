import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCamera } from "react-icons/ci";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';


function Signup() {
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
      if(!name , !email , !password){
        return toast.error('all Inputs should be filled')
      }
      const { user } = await createUserWithEmailAndPassword(auth, email, password);;
      const profileImage = defaultProfilePic;
      await updateProfile(user, {
        displayName: name,
        photoURL: profileImage
    });
      await addUserToFirestore(user.uid, { email, password , name , profileImage });
    } catch (error) {
      return toast.error("Failed to sign up", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg bg-gray-800">
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
        <form onSubmit={handleSignup} className="space-y-4">
          <div className='flex gap-5'>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full p-3 mt-4 font-semibold text-white rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
