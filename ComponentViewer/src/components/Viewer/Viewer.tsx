import { useState } from 'react';
import styles from './Viewer.module.css';
import RangeSlider from '../../UI/RangeSlider/RangeSlider';
import Zoomer from '../../UI/Zoomer/Zoomer';
import EmbedComponent from '../../UI/Zoomer/EmbedComponent/EmbedComponent';

interface Viewer {
  withRangeSlider?: boolean;
  children: React.ReactElement;
  isEmbed: boolean;
}

Viewer.defaultProps = {
  withRangeSlider: true,
  isEmbed: false,
};

const breakpoints = [
  320, 374, 480, 600, 720, 880, 1024, 1120, 1240, 1360, 1440, 1520, 1600, 1750,
  1900, 2100, 2400, 2560, 2800, 3300,
];

export default function Viewer(props: Viewer) {
  console.log('render Viewer');
  const { withRangeSlider, children, isEmbed } = props;

  const [resolution, setResolution] = useState(720);

  const RangeSliderProps = {
    resolution,
    setResolution,
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
        {breakpoints.map((point) => {
          return (
            <option key={point} value={point} label={point.toString()}></option>
          );
        })}
      </datalist>
    </div>
  );
}
