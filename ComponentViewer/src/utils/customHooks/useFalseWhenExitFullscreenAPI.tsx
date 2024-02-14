import { useEffect, useRef } from 'react';

export default function useFalseWhenExitFullscreenAPI(
  targetEventListener: { current: HTMLElement | null },
  setState: (value: boolean) => void
) {
  const fullscreenListener = useRef(null);
  useEffect(() => {
    if (!fullscreenListener.current) {
      fullscreenListener.current = targetEventListener.current.addEventListener(
        'fullscreenchange',
        () => {
          if (!document.fullscreenElement) setState(false);
        }
      );
    }

    const target = targetEventListener.current;
    return () => {
      target.removeEventListener(
        'fullscreenchange',
        fullscreenListener.current
      );
    };

    // eslint-disable-next-line
  }, []);
}
