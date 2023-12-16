import { useState } from 'react';
import styles from './Viewer.module.css';
import RangeSlider from '../../UI/RangeSlider/RangeSlider';
import Zoomer from '../../UI/Zoomer/Zoomer';

interface Viewer {
  withRangeSlider?: boolean;
  children: React.ReactElement;
  width?: number;
}

Viewer.defaultProps = {
  withRangeSlider: true,
};

const breakpoints = [
  320, 374, 480, 600, 720, 880, 1024, 1120, 1240, 1360, 1440, 1520, 1600, 1750,
  1900, 2100, 2400, 2560, 2800, 3300,
];

export default function Viewer(props: Viewer) {
  console.log('render Viewer');
  const { withRangeSlider, children } = props;

  const [resolution, setResolution] = useState(720);

  const RangeSliderProps = {
    resolution,
    setResolution,
  };
  const ZoomerProps = {
    resolution,
  };
  return (
    <div className={styles.container}>
      <Zoomer {...ZoomerProps}>{children}</Zoomer>
      {withRangeSlider && <RangeSlider {...RangeSliderProps} />}

      <datalist id="markersOfRangeSlider">
        {breakpoints.map((point) => {
          return (
            <option key={point} value={point} label={point.toString()}></option>
          );
        })}
      </datalist>
    </div>
  );
}
