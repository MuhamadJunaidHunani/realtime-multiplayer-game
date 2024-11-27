import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import { auth, provider } from '../Firebase/Firebase';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import BgDesing from '../Components/BgDesing';
import { IoMdEye } from 'react-icons/io';
import { RiEyeCloseFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { setcurrentUserLoading } from '../Redux/Slices/CurrentUser.slice';
import { addUserToFirestore } from '../Firebase/AddUserToFirestore';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch()

  const SigninWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const profile = 'https://res.cloudinary.com/duaxitxph/image/upload/v1732693101/chdzzmkdoudncvaontbh.png';
      await updateProfile(user, {
       photoURL: profile });
       const additionalInfo = result._tokenResponse?.isNewUser; 
       if (additionalInfo) {
         const {displayName , email } = user
         await addUserToFirestore(user.uid, { email, name:displayName, profileImage:profile , win:0 , lose:0  });
     }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Error during sign-in:", error)
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setcurrentUserLoading(true))
      await signInWithEmailAndPassword(auth, email, password);;
    } catch (error) {
      toast.error(error.message)
      console.error("Failed to login:", error.message);
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
         <div className='flex flex-col justify-between items-center pb-[20px] '>
           <h2 className="text-3xl font-bold text-center">Login</h2>
         </div>
         <form onSubmit={handleLogin} className="space-y-[30px]">
           <input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
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
             Login
           </button>
         </form>
         <button onClick={() => SigninWithGoogle()} class="flex items-center w-full justify-center gap-2 px-4 py-3 my-[10px] bg-[#000000] rounded-md shadow hover:scale-105 transition-all">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" class="w-5 h-5" />
          <span class="text-[#ffffff] font-semibold">Continue with Google</span>
        </button>
         <p className="text-gray-400 mt-4 text-center">
         Don't have an account? <Link to="/signup" className="text-black hover:underline">Signup</Link>
         </p>
       </div>
     </BgDesing>
  );
}

export default Login;
