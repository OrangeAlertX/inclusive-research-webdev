import { useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Viewer.module.css';
import RangeSlider from './RangeSlider/RangeSlider';
import EmbedComponent from './EmbedComponent/EmbedComponent';
import variables from '../App/variables.module.css';
import useFullscreen from '../../utils/customHooks/useFullscreen';
import useStateWithUpdate from '../../utils/customHooks/useStateWithUpdate';

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
   * @defaultValue  true
   */
  fitContent: boolean;
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
   - Viewer
    - - container
        - - - main
          - - - - outer
            - - - - - inner
        - - - Overlay
    - - RangeSlider
      - - - container
        - - - - slider
        - - - - tooltip
    - ~FullPage
   */
  externalStyles?: string;
}

Viewer.defaultProps = {
  withFullPage: true,
  withMobileView: true,
  fitContent: true,
  heightAdjust: false,
  ViewerHeightDefault: 400,
  src: null,
  min: 320,
  max: 3840,
};

const breakpoints = [
  320, 374, 480, 600, 720, 880, 1024, 1120, 1240, 1360, 1440, 1520, 1600, 1750,
  1900, 2100, 2400, 2560, 2800, 3300,
];

/////////////////////////
export default function Viewer(props: IViewer) {
  const {
    withFullPage,
    withMobileView,
    fitContent,
    heightAdjust,
    ViewerHeightDefault,
    children,
    src,
    min,
    max,
    externalStyles,
  } = props;

  const [resolution, setResolution] = useStateWithUpdate(Math.max(720, min));

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
    className: classNames({ [styles.RangeSlider]: fullscreen }),
    colors: externalStyles ?? variables.colorsDefault,
    parentValue: resolution,
    setParentValue: setResolution,
    min,
    max,
    setRangeSliderRef,
    breakpoints,
    isHorizontal: fullscreen,
    visible: !fitContent || fullscreen,
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
    fitContent,
    heightAdjust,
    ViewerHeight,
    setViewerHeightHandler,
  };

  return (
    <div
      ref={ViewerRef}
      style={ViewerHeight ? { height: ViewerHeight + 'px' } : null}
      className={classNames(
        styles.Viewer,
        externalStyles ?? variables.colorsDefault,
        min === max || fitContent ? styles.width100 : false,
        !ViewerHeight ? styles.height100 : false
      )}
    >
      <EmbedComponent {...EmbedProps}>{children}</EmbedComponent>
      {min !== max && <RangeSlider {...RangeSliderProps} />}
    </div>
  );
}
