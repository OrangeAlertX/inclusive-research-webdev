import { Dispatch, MutableRefObject, useEffect } from 'react';
import useSetFalseWhenExitFullscreenAPI from './useSetFalseWhenExitFullscreenAPI';

interface IuseFullscreen {
  elementRef: MutableRefObject<any>;
  fullscreenState: boolean;
  setFullscreenState: Dispatch<React.SetStateAction<boolean>>;
}

export default function useFullscreen(props: IuseFullscreen) {
  const { elementRef, fullscreenState, setFullscreenState } = props;

  useEffect(() => {
    const mustBeFullscreen = fullscreenState;
    const isFullscreenNow = document.fullscreenElement;

    if (mustBeFullscreen && !isFullscreenNow) {
      elementRef.current.requestFullscreen();
    } else if (isFullscreenNow) {
      document.exitFullscreen();
    }
  }, [fullscreenState]);

  useSetFalseWhenExitFullscreenAPI({
    target: elementRef,
    setState: setFullscreenState,
  });
}
