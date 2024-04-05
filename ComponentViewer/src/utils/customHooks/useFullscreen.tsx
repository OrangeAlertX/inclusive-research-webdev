import { Dispatch, MutableRefObject, useEffect, useState } from 'react';
import useSetFalseWhenExitFullscreenAPI from './useSetFalseWhenExitFullscreenAPI';

type elementRefType = MutableRefObject<any>;

/**
 * Band fullscreen state and API together
 * @returns [fullscreen, setFullscreen]
 */
export default function useFullscreen(elementRef: elementRefType) {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const mustBeFullscreen = fullscreen;
    const isFullscreenNow = document.fullscreenElement === elementRef.current;

    if (mustBeFullscreen && !isFullscreenNow) {
      elementRef.current.requestFullscreen();
    } else if (isFullscreenNow) {
      document.exitFullscreen();
    }
  }, [fullscreen]);

  useSetFalseWhenExitFullscreenAPI({
    target: elementRef,
    setState: setFullscreen,
  });

  return [fullscreen, setFullscreen] as [
    boolean,
    Dispatch<React.SetStateAction<boolean>>
  ];
}
