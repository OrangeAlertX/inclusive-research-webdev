import { useState } from 'react';
import styles from './RangeSlider.module.css';

interface RangeSlider {
  resolution?: number;
  setResolution: React.Dispatch<React.SetStateAction<number>>;
}

RangeSlider.defaultProps = {
  resolution: 720,
};

let timeout;
export default function RangeSlider(props) {
  console.log('render RangeSlider');
  const { resolution, setResolution } = props;

  const [currentResolution, setCurrentResolution] = useState(720);

  const setResolutionHandler = (e) => {
    setCurrentResolution(e.target.value);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setResolution(e.target.value);
      console.log(e.target.value);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.slider}
        type="range"
        min="320"
        max="3840"
        step="10"
        onChange={(e) => setResolutionHandler(e)}
        defaultValue={resolution}
        list="markersOfRangeSlider"
      ></input>
      <span className={styles.tooltip}>{currentResolution}</span>
    </div>
  );
}
