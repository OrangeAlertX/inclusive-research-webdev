import { useEffect, useRef, useState } from 'react';
import styles from './RangeSlider.module.css';

interface RangeSlider {
  resolution?: number;
  setResolution: React.Dispatch<React.SetStateAction<number>>;

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

export default function RangeSlider(props: RangeSlider) {
  const { resolution, setResolution } = props;

  let className = props.className;
  if (className) className = styles.container + ' ' + className;
  else className = styles.container;
  ///////////////////////////////////

  const ref = useRef(null);
  useEffect(() => {
    ref.current.addEventListener(
      'wheel',
      (e) => eventWheel(e, setResolution, setCurrentResolution),
      { passive: false }
    );
    console.log('useEffect');
  }, []);

  const [currentResolution, setCurrentResolution] = useState(720);

  return (
    <div className={className}>
      <input
        className={styles.slider}
        type="range"
        min="320"
        max="3840"
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
  );
}
