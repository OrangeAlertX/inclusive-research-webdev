import { useState, useMemo, useCallback } from 'react';
import styles from './Viewer.module.css';
import RangeSlider from './RangeSlider/RangeSlider';
import Zoomer from './Zoomer/Zoomer';
import EmbedComponent from './Zoomer/EmbedComponent/EmbedComponent';

interface IViewer {
  withRangeSlider?: boolean;
  children: React.ReactElement;
  isEmbed: boolean;
  min: number;
  max: number;
}

Viewer.defaultProps = {
  withRangeSlider: true,
  isEmbed: true,
  min: 320,
  max: 3840,
};

const breakpoints = [
  320, 374, 480, 600, 720, 880, 1024, 1120, 1240, 1360, 1440, 1520, 1600, 1750,
  1900, 2100, 2400, 2560, 2800, 3300,
];

export default function Viewer(props: IViewer) {
  console.log('render Viewer');
  const { withRangeSlider, children, isEmbed, min, max } = props;

  const breakpointsOnMinMax = useMemo(() => {
    const newBreakpoints = breakpoints.filter((point) => {
      if (point > min && point < max) return true;
      return false;
    });
    newBreakpoints.push(max);
    newBreakpoints.unshift(min);
    return newBreakpoints;
  }, [min, max]);

  const [resolution, setResolution] = useState(720);

  const RangeSliderProps = {
    resolution,
    setResolution,
    min,
    max,
  };
  const ZoomerProps = {
    resolution,
  };

  const ZoomerOrEmbed = isEmbed ? EmbedComponent : Zoomer;

  return (
    <div className={styles.container}>
      <ZoomerOrEmbed {...ZoomerProps}>{children}</ZoomerOrEmbed>
      {withRangeSlider && <RangeSlider {...RangeSliderProps} />}

      <datalist id="markersOfRangeSlider">
        {breakpointsOnMinMax.map((point) => {
          return (
            <option key={point} value={point} label={point.toString()}></option>
          );
        })}
      </datalist>
    </div>
  );
}
