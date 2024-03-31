import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import styles from './RangeSlider.module.css';
import classNames from 'classnames';
import debounce from '../../../utils/asyncTools/debounce';
import useCallbackOnWheel from '../../../utils/customHooks/useCallbackOnWheel';

interface IRangeSlider {
  resolution: number;
  setResolution: Dispatch<SetStateAction<number>>;
  min: number;
  max: number;
  fullscreen: boolean;
  RangeSliderRef: React.MutableRefObject<any>;
  withRangeSlider: boolean;
  className?: string;
}

RangeSlider.defaultProps = {};

const eventWheel = (e, resolutionHandler) => {
  const cur = e.target.value;
  const step = 10;
  if (e.deltaY < 0) {
    e.target.value = +cur + step;
  } else {
    e.target.value -= step;
  }
  e.preventDefault();
  e.stopPropagation();
  resolutionHandler(e);
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

  const [currentResolution, setCurrentResolution] = useState(resolution);
  const parentRerender = useCallback(
    debounce((value) => setResolution(value), 1000),
    []
  );
  const selectedResNow = useCallback(
    debounce((value) => setCurrentResolution(value), 50),
    []
  );
  const resolutionHandler = useCallback(
    (e) => {
      const curValue = e.target.value;
      parentRerender(curValue);
      selectedResNow(curValue);
    },
    [parentRerender, selectedResNow]
  );

  const cb = useCallback(
    (e) => eventWheel(e, resolutionHandler),
    [resolutionHandler]
  );
  const ref = useRef(null);
  useCallbackOnWheel(cb, ref);

  //
  let fullscreenMod = '';
  if (!withRangeSlider) {
    fullscreenMod = styles.disable;
  } else if (fullscreen) {
    fullscreenMod = classNames(props.className, styles.fullscreen);
  }

  return (
    <div className={fullscreenMod} ref={RangeSliderRef}>
      <div
        className={classNames(styles.container, {
          [styles.disable]: min === max,
        })}
      >
        <input
          className={styles.slider}
          type="range"
          min={min.toString()}
          max={max.toString()}
          step="2"
          onChange={(e) => {
            resolutionHandler(e);
          }}
          defaultValue={resolution}
          list="markersOfRangeSlider"
          ref={ref}
        ></input>
        <span className={styles.tooltip}>{currentResolution}</span>
      </div>
    </div>
  );
}
