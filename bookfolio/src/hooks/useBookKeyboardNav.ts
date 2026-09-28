import { useEffect } from 'react';

// Keyboard and volume-button support for flipping pages
export function useBookKeyboardNav(nextPage: () => void, prevPage: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'AudioVolumeDown') {
        if (e.key === 'AudioVolumeDown') e.preventDefault(); // Attempt to block default volume UI
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'AudioVolumeUp') {
        if (e.key === 'AudioVolumeUp') e.preventDefault();
        prevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);
}
