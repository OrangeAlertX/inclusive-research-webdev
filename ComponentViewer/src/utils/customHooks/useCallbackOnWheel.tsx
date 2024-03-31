import { useEffect } from 'react';

/**
 *
 * @param cb callback
 * @param ref element, on which the event is used
 */
export default function useCallbackOnWheel(cb, ref) {
  useEffect(() => {
    ref.current.addEventListener('wheel', cb, { passive: false });

    const curRef = ref.current;
    return () => {
      curRef.removeEventListener('wheel', cb);
    };
  }, [ref]);
}
