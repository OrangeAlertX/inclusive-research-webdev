import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import styles from './RangeSlider.module.css';
import classNames from 'classnames';
import debounce from '../../../utils/asyncTools/debounce';
import useCallbackOnWheel from '../../../utils/customHooks/useCallbackOnWheel';
import RangeOptions from './RangeOptions';

interface IRangeSlider {
  resolution?: number;
  setResolution?: Dispatch<SetStateAction<number>>;
  min: number;
  max: number;
  fullscreen?: boolean;
  setRangeSliderRef?: React.Dispatch<Element>;
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
  const { resolution, setResolution, min, max, fullscreen, setRangeSliderRef } =
    props;

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
  const [inputRef, setInputRef] = useState(null);
  useCallbackOnWheel(cb, inputRef);

  const fullscreenMod = classNames(props.className, styles.fullscreen);

  return (
    <div
      className={classNames(
        { [fullscreenMod]: min !== max && fullscreen },
        { [styles.disable]: min === max }
      )}
      ref={setRangeSliderRef}
    >
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
          ref={setInputRef}
        ></input>
        <span className={styles.tooltip}>{currentResolution}</span>
      </div>
      <RangeOptions min={min} max={max} />
    </div>
  );
}
