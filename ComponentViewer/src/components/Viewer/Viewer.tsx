import { useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Viewer.module.css';
import RangeSlider from './RangeSlider/RangeSlider';
import EmbedComponent from './EmbedComponent/EmbedComponent';
import variables from '../App/variables.module.css';
import useFullscreen from '../../utils/customHooks/useFullscreen';
import useStateWithUpdate from '../../utils/customHooks/useStateWithUpdate';
import ViewerRangeOptions from './ViewerRangeOptions';

interface IViewer {
  /**
   * @defaultValue true
   */
  withFullPage?: boolean;
  /**
   * When viewport > 1024px, changing width/height proportion for Viewer < 1024
   * @defaultValue true
   */
  withMobileView?: boolean;
  /**
   * Changing height when width was changed, to save width/height proportion
   * @defaultValue false
   */
  heightAdjust?: boolean;
  /**
   * @defaultValue  400(px)
   */
  ViewerHeightDefault?: number;
  /**
   * Alternative: src.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Link to the page, can be omitted.
   * Alternative: children.
   */
  src?: string | null;
  /**\
   * if min === max, RangeSlider will be omitted
   * @defaultValue 320
   */
  min?: number;
  /**\
   * if min === max, RangeSlider will be omitted
   * @defaultValue 3840
   */
  max?: number;
  /**
   * @defaultValue pass className with defined
   --main-color, 
   --second-color
   */
  colors?: string;
}

Viewer.defaultProps = {
  withFullPage: true,
  withMobileView: true,
  heightAdjust: false,
  ViewerHeightDefault: 400,
  src: null,
  min: 320,
  max: 3840,
  colors: variables.colorsDefault,
};

/////////////////////////
export default function Viewer(props: IViewer) {
  const {
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

  const [resolution, setResolution] = useState(Math.max(720, min));

  const [ViewerHeight, setViewerHeight] =
    useStateWithUpdate(ViewerHeightDefault);
  const setViewerHeightHandler = (multiplier: number) =>
    setViewerHeight(ViewerHeightDefault * multiplier);

  const [RangeSliderRef, setRangeSliderRef] = useState<Element>(null);

  const ViewerRef = useRef(null);
  const [fullscreen, setFullscreen] = useFullscreen(ViewerRef);
  const toggleFullscreen = () => {
    setFullscreen((fullscreen) => !fullscreen);
  };

  const RangeSliderProps = {
    resolution,
    setResolution,
    min,
    max,
    className: styles.RangeSlider,
    fullscreen,
    setRangeSliderRef,
  };
  const EmbedProps = {
    resolution,
    fullscreen,
    toggleFullscreen,
    src,
    RangeSliderRef,
    withRangeSlider: min !== max,
    withFullPage,
    withMobileView,
    heightAdjust,
    ViewerHeight,
    setViewerHeightHandler,
  };

  return (
    <div
      ref={ViewerRef}
      style={{ height: ViewerHeight + 'px' }}
      className={classNames(
        styles.Viewer,
        colors,
        min === max ? styles.width100 : false
      )}
    >
      <EmbedComponent {...EmbedProps}>{children}</EmbedComponent>
      {min !== max && <RangeSlider {...RangeSliderProps} />}

      <ViewerRangeOptions min={min} max={max} />
    </div>
  );
}
