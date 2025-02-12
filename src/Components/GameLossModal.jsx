import React from 'react'

const GameLossModal = ({onClose}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl border-4 border-red-500 p-6 w-80 text-center">
                <h2 className="text-4xl font-bold text-red-600 mb-4">😔 Game Over</h2>
                <p className="text-gray-700 text-lg mb-6">
                    You Lose!
                </p>
                <button
                    onClick={onClose}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-150"
                >
                    ReTry Later
                </button>
            </div>
        </div>
    );
}

export default GameLossModal