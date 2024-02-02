import { useEffect, useRef, useState } from 'react';
import styles from './RangeSlider.module.css';

interface IRangeSlider {
  resolution?: number;
  setResolution: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
  fullscreen: boolean;
  RangeSliderRef: React.MutableRefObject<any>;
  withRangeSlider: boolean;
  className?: string;
}

RangeSlider.defaultProps = {
  resolution: 720,
};

let timeoutForParentRerender;
let timeoutForCurrentRerender;
const setResolutionHandler = (e, setResolution, setCurrentResolution) => {
  if (timeoutForParentRerender) clearTimeout(timeoutForParentRerender);
  timeoutForParentRerender = setTimeout(() => {
    setResolution(e.target.value);
  }, 1000);

  if (timeoutForCurrentRerender) clearTimeout(timeoutForCurrentRerender);
  timeoutForCurrentRerender = setTimeout(() => {
    setCurrentResolution(e.target.value);
  }, 50);
};

const eventWheel = (e, setResolution, setCurrentResolution) => {
  const cur = e.target.value;
  const step = 10;
  if (e.deltaY < 0) {
    e.target.value = +cur + step;
  } else {
    e.target.value -= step;
  }
  e.preventDefault();
  e.stopPropagation();
  setResolutionHandler(e, setResolution, setCurrentResolution);
};

export default function RangeSlider(props: IRangeSlider) {
  const {
    resolution,
    setResolution,
    min,
    max,
    fullscreen,
    withRangeSlider,
    RangeSliderRef,
  } = props;

  const ref = useRef(null);
  useEffect(() => {
    const cb = (e) => eventWheel(e, setResolution, setCurrentResolution);
    ref.current.addEventListener('wheel', cb, { passive: false });

    const curRef = ref.current;
    return () => {
      curRef.removeEventListener('wheel', cb);
    };
  }, [setResolution, ref]);

  const [currentResolution, setCurrentResolution] = useState(resolution);

  let fullscreenContainer = fullscreen
    ? `${props.className} ${styles.fullscreen}`
    : '';
  if (!fullscreenContainer && !withRangeSlider)
    fullscreenContainer = styles.disable;
  const disableRange = min === max ? ` ${styles.disable}` : '';

  return (
    <div className={fullscreenContainer} ref={RangeSliderRef}>
      <div className={styles.container + disableRange}>
        <input
          className={styles.slider}
          type="range"
          min={min.toString()}
          max={max.toString()}
          step="2"
          onChange={(e) =>
            setResolutionHandler(e, setResolution, setCurrentResolution)
          }
          defaultValue={resolution}
          list="markersOfRangeSlider"
          ref={ref}
        ></input>
        <span className={styles.tooltip}>{currentResolution}</span>
      </div>
    </div>
  );
}
