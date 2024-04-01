import { useEffect } from 'react';

/**
 *
 * @param cb callback
 * @param ref element, on which the event is used
 */
export default function useCallbackOnWheel(cb, ref) {
  useEffect(() => {
    if (!ref) return;

    ref.addEventListener('wheel', cb, { passive: false });

    const curRef = ref;
    return () => {
      curRef.removeEventListener('wheel', cb);
    };
  }, [ref]);
}
