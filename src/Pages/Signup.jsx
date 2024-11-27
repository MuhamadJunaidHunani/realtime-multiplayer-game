import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCamera } from "react-icons/ci";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, provider } from '../Firebase/Firebase';
import { addUserToFirestore } from '../Firebase/AddUserToFirestore';
import { IoMdEye } from 'react-icons/io';
import { RiEyeCloseFill } from 'react-icons/ri';
import BgDesing from '../Components/BgDesing';
import { useDispatch } from 'react-redux';
import { setcurrentUserLoading } from '../Redux/Slices/CurrentUser.slice';


function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profileIndex, setProfileIndex] = useState(0);
  const dispatch = useDispatch()

  const avatars = [
    'https://res.cloudinary.com/duaxitxph/image/upload/v1732693117/tat2otrx0ae26zjyvb33.png',
    'https://res.cloudinary.com/duaxitxph/image/upload/v1732693113/bypxtqiae3dmiejj3dtu.png',
    'https://res.cloudinary.com/duaxitxph/image/upload/v1732693111/fbahicsumiw6nj8df44d.png',
    'https://res.cloudinary.com/duaxitxph/image/upload/v1732693104/iahyx4tmsbsf2l2t6wdu.png',
    'https://res.cloudinary.com/duaxitxph/image/upload/v1732693101/chdzzmkdoudncvaontbh.png',
  ];
  const SigninWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result
      await updateProfile(user, { photoURL: avatars[4] });
      const additionalInfo = result._tokenResponse?.isNewUser; 
      if (additionalInfo) {
        const {displayName , email } = user
        await addUserToFirestore(user.uid, { email, name:displayName, profileImage:avatars[4] , win:0 , lose:0  });
    }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Error during sign-in:", error)
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!name, !email, !password) {
        return toast.error('all Inputs should be filled')
      }
      dispatch(setcurrentUserLoading(true))
      const profileImage = avatars[profileIndex];
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name, photoURL: profileImage });
      await addUserToFirestore(user.uid, { email, name, profileImage , win:0 , lose:0  });
    } catch (error) {
      return toast.error("Failed to sign up", error);
      dispatch(setcurrentUserLoading(false))
    }
  };

  return (
    <BgDesing>
      <div className="w-full py-[20px] px-[30px] rounded-lg shadow-lg  "
        style={{
          background: '#ffe2c266',
          boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10.7px)'
        }}>
        <div className='flex flex-col justify-between items-center '>
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>
          <div className='flex gap-3 my-[15px]'>
            {avatars.map((image, index) => (
              <div className={`w-[45px] h-[45px] overflow-hidden rounded-full bg-[#00000082] border-2 border-[#303030] cursor-pointer ${profileIndex === index ? 'p-2 border-[#ffffff]' : 'p-[4px]'} `} onClick={() => setProfileIndex(index)}>
                <img src={image} alt={index} className='' />
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSignup} className="space-y-[30px]">
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
          <div className='relative flex items-center'>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-0 h-[30px]  bg-transparent focus:outline-none border-b-2 border-[black]"
            />
            <div className='absolute right-2 cursor-pointer' onClick={() => {
              setPasswordVisible(!passwordVisible)
            }}>
              {passwordVisible ? <IoMdEye /> : <RiEyeCloseFill />}
            </div>
          </ div>
          <button
            type="submit"
            className="w-full p-3 mt-4 font-semibold text-white rounded-md bg-[black] hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <button onClick={() => SigninWithGoogle()} class="flex items-center w-full justify-center gap-2 px-4 py-3 my-[10px] bg-[#000000] rounded-md shadow hover:scale-105 transition-all">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" class="w-5 h-5" />
          <span class="text-[#ffffff] font-semibold">Continue with Google</span>
        </button>
        <p className="text-gray-400 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-black hover:underline">Login</Link>
        </p>
      </div>
    </BgDesing>
  );
}

export default Signup;
