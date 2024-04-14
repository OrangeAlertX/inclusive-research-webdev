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
    // const isFullscreenNow = elementRef.current.contains(
    //   document.fullscreenElement
    // );

    if (mustBeFullscreen) {
      elementRef.current.requestFullscreen();
    } else if (document.fullscreenElement) {
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
