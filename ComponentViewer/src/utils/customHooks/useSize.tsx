import { useEffect, useState } from 'react';

/**
 *
 * @param ref htmlElement
 * @returns actual width and height of this htmlElement
 */
export default function useSize(ref) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref) return;

    const cb = () => {
      setWidth(ref.offsetWidth);
      setHeight(ref.offsetHeight);
    };
    const resizeObserver = new ResizeObserver(cb);
    resizeObserver.observe(ref);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return [width, height];
}
