import { useState, useMemo, useRef, useEffect, ReactElement } from 'react';
import classNames from 'classnames';
import styles from './Viewer.module.css';
import RangeSlider from './RangeSlider/RangeSlider';
import EmbedComponent from './EmbedComponent/EmbedComponent';
import variables from '../App/variables.module.css';
import useFullscreen from '../../utils/customHooks/useFullscreen';

interface IViewer {
  /**
   @defaultValue true
   */
  withRangeSlider?: boolean;
  /**
   @defaultValue true
   */
  withFullPage?: boolean;
  /**
   @defaultValue true
   */
  withMobileView?: boolean;
  /**
   @defaultValue false
   */
  heightAdjust?: boolean;
  /**
   @defaultValue  400
   */
  ViewerHeightDefault?: number;
  /**
   */
  children?: ReactElement;
  /**
   @defaultValue ''
   */
  src?: string;
  /**
   @defaultValue 320
   */
  min: number;
  /**
   @defaultValue 3840
   */
  max: number;
  /**
   @defaultValue --main-color, --second-color
   */
  colors?: string;
}

Viewer.defaultProps = {
  withRangeSlider: true,
  withFullPage: true,
  withMobileView: true,
  heightAdjust: false,
  ViewerHeightDefault: 400,
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
    withMobileView,
    heightAdjust,
    ViewerHeightDefault,
    children,
    src,
    min,
    max,
    colors,
  } = props;

  const breakpointsOnMinMax = useMemo(() => {
    const newBreakpoints = breakpoints.filter((point) => {
      return point > min && point < max;
    });
    newBreakpoints.push(max);
    newBreakpoints.unshift(min);
    return newBreakpoints;
  }, [min, max]);

  const [resolution, setResolution] = useState(Math.max(720, min));
  const [fullscreen, toggleFullscreen] = useState(false);
  const onClick = () => {
    toggleFullscreen((fullscreen) => !fullscreen);
  };
  const [ViewerHeight, setViewerHeight] = useState(ViewerHeightDefault);
  const setViewerHeightHandler = (multiplier: number) =>
    setViewerHeight(ViewerHeightDefault * multiplier);
  useEffect(() => {
    setViewerHeight(ViewerHeightDefault);
  }, [ViewerHeightDefault]);

  const RangeSliderRef = useRef(null);
  const ViewerRef = useRef(null);

  useFullscreen({
    elementRef: ViewerRef,
    fullscreenState: fullscreen,
    setFullscreenState: toggleFullscreen,
  });

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
    withMobileView,
    heightAdjust,
    ViewerHeight,
    setViewerHeightHandler,
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
      ref={ViewerRef}
      style={{ height: ViewerHeight + 'px' }}
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
