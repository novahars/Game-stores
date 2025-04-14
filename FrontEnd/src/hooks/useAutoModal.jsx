import { useState, useEffect } from 'react';

export const useAutoModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if modal has been shown before
    const hasModalBeenShown = localStorage.getItem('modalShown');
    
    if (!hasModalBeenShown) {
      const timer = setTimeout(() => {
        setShowModal(true);
        // Mark that modal has been shown
        localStorage.setItem('modalShown', 'true');
      }, 60000); // 60000ms = 1 minute

      return () => clearTimeout(timer);
    }
  }, []);

  return { showModal, setShowModal };
};