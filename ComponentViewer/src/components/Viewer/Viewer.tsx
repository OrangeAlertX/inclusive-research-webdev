import { useState, useMemo, useRef } from 'react';
import classNames from 'classnames';
import styles from './Viewer.module.css';
import RangeSlider from './RangeSlider/RangeSlider';
import EmbedComponent from './EmbedComponent/EmbedComponent';
import variables from '../App/variables.module.css';

interface IViewer {
  withRangeSlider?: boolean;
  withFullPage?: boolean;
  heightAdjust?: boolean;
  containerHeightDefault?: number;
  children?: React.ReactElement;
  src?: string;
  min: number;
  max: number;
  colors?: string;
}

Viewer.defaultProps = {
  withRangeSlider: true,
  withFullPage: true,
  heightAdjust: false,
  containerHeightDefault: 400,
  src: '',
  min: 320,
  max: 3840,
  colors: variables.colorsDefault,
};

const breakpoints = [
  320, 374, 480, 600, 720, 880, 1024, 1120, 1240, 1360, 1440, 1520, 1600, 1750,
  1900, 2100, 2400, 2560, 2800, 3300,
];

/////////////////////////
export default function Viewer(props: IViewer) {
  const {
    withRangeSlider,
    withFullPage,
    heightAdjust,
    containerHeightDefault,
    children,
    src,
    min,
    max,
    colors,
  } = props;

  const breakpointsOnMinMax = useMemo(() => {
    const newBreakpoints = breakpoints.filter((point) => {
      if (point > min && point < max) return true;
      return false;
    });
    newBreakpoints.push(max);
    newBreakpoints.unshift(min);
    return newBreakpoints;
  }, [min, max]);

  const [resolution, setResolution] = useState(Math.max(720, min));
  const [fullscreen, toggleFullscreen] = useState(false);
  const onClick = () => {
    toggleFullscreen(!fullscreen);
  };
  const [containerHeight, setContainerHeight] = useState(
    containerHeightDefault
  );
  const RangeSliderRef = useRef(null);

  const RangeSliderProps = {
    resolution,
    setResolution,
    min,
    max,
    className: styles.RangeSlider,
    fullscreen,
    RangeSliderRef,
    withRangeSlider,
  };
  const EmbedProps = {
    resolution,
    fullscreen,
    onClick,
    src,
    RangeSliderRef,
    withRangeSlider,
    withFullPage,
    heightAdjust,
    setContainerHeight,
  };

  const RangeOptions =
    min !== max ? (
      <datalist id="markersOfRangeSlider">
        {breakpointsOnMinMax.map((point) => {
          return (
            <option key={point} value={point} label={point.toString()}></option>
          );
        })}
      </datalist>
    ) : null;

  return (
    <div
      style={{ height: containerHeight + 'px' }}
      className={classNames(
        styles.Viewer,
        colors,
        !withRangeSlider ? styles.width100 : false
      )}
    >
      <EmbedComponent {...EmbedProps}>{children}</EmbedComponent>
      <RangeSlider {...RangeSliderProps} />

      {RangeOptions}
    </div>
  );
}
