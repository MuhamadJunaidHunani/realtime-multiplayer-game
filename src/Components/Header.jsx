import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/Firebase';

const Header = () => {
  const { currentUser } = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
  };

  return (
    <header className="bg-gray-100 border-b border-gray-300 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <h1
            className="text-[40px] font-bold text-black cursor-pointer"
            onClick={() => navigate('/')}
          >
            BOOST
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate('/leader-board')}
            className="text-gray-700 hover:text-green-600 font-medium"
          >
            Leaderboard
          </button>

          {currentUser && (
            <div className="flex items-center space-x-3">
              <img
                src={
                  currentUser.photoURL ||
                  'https://via.placeholder.com/40'
                }
                alt="User Profile"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <div className="text-sm">
                <p className="font-medium text-gray-800">{currentUser.displayName}</p>
                <p className="text-gray-500">{currentUser.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
