import React from "react";

function Alert({ onClose }) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-300 p-6 border-8 border-red-900 z-50 font-['Press_Start_2P'] text-red-900">
      <h2 className="text-lg font-bold text-red-900 text-center">
        WARNING!!
      </h2>
      <p className="mt-4 text-red-900 text-sm">
        You can't go there without courses!!
      </p>
      <div className="flex justify-center mt-4">
        <button 
          onClick={onClose} 
          className="px-6 py-3 bg-red-500 text-white border-4 border-red-900 font-['Press_Start_2P'] text-sm"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Alert;





