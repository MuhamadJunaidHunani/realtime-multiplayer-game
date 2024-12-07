import React from 'react'

const GameWonModal = ({onClose}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl border-4 border-green-500 p-6 w-80 text-center">
            <h2 className="text-4xl font-bold text-green-600 mb-4">🎉 You Won!</h2>
            <p className="text-gray-700 text-lg mb-6">
              Congratulations!
            </p>
            <button
              onClick={onClose}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-150"
            >
              Celebrate
            </button>
          </div>
        </div>
      );
}

export default GameWonModal