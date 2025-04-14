import { useState } from 'react';

const HamburgerMenu = ({ onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-2 cursor-pointer"
    >
      <div className="w-6 h-0.5 bg-white mb-1.5"></div>
      <div className="w-6 h-0.5 bg-white mb-1.5"></div>
      <div className="w-6 h-0.5 bg-white"></div>
    </button>
  );
};

export default HamburgerMenu;