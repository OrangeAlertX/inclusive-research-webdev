import { useEffect, useState } from 'react';

/**
 *
 * @returns actual width and height of viewport
 */
export default function useViewportSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const cb = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    const resizeObserver = new ResizeObserver(cb);
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [width, height];
}
