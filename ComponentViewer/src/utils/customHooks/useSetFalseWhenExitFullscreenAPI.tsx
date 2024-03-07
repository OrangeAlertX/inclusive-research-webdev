import { useEffect } from 'react';

interface IExitFullscreen {
  target: { current: HTMLElement | null };
  setState: (value: boolean) => void;
}

export default function useSetFalseWhenExitFullscreenAPI(
  props: IExitFullscreen
) {
  const { target, setState } = props;

  useEffect(() => {
    const callback = () => {
      if (!document.fullscreenElement) setState(false);
    };
    target.current.addEventListener(
      'fullscreenchange',
      callback
    );
    const safeTarget = target.current;
    return () => {
      safeTarget.removeEventListener('fullscreenchange', callback);
    };
  }, []); // eslint-disable-line
}
