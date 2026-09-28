import { useEffect, useState, RefObject } from 'react';

// Native size of the desktop 3D book (see .book in globals.css)
const BOOK_WIDTH = 960;
const BOOK_HEIGHT = 600;
const RESIZE_DEBOUNCE_MS = 100;

// Scales the book down to fit smaller viewports; never scales it up past its native size.
export function useBookScale(containerRef: RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const computeScale = () => {
      const el = containerRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      setScale(Math.min(1, width / BOOK_WIDTH, height / BOOK_HEIGHT));
    };

    computeScale();

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(computeScale, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  return scale;
}
