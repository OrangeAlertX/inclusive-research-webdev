import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import styles from './RangeSlider.module.css';
import classNames from 'classnames';
import debounce from '../../../utils/asyncTools/debounce';
import useCallbackOnWheel from '../../../utils/customHooks/useCallbackOnWheel';
import RangeOptions from './RangeOptions';
import { v4 as uuidv4 } from 'uuid';

interface IRangeSlider {
  className?: string;
  /**
   * Provide variables like --main-color, --second-color, --z-index
   */
  colors?: string;
  setRangeSliderRef?: React.Dispatch<Element>;
  parentValue: number;
  setParentValue: Dispatch<SetStateAction<number>>;
  min: number;
  max: number;
  keyStep: number;
  scrollStep: number;
  breakpoints?: number[];
  isHorizontal?: boolean;
}

RangeSlider.defaultProps = {
  keyStep: 2,
  scrollStep: 10,
  isHorizontal: false,
};

const eventWheel = (e, valueHandler, step) => {
  const cur = e.target.value;
  if (e.deltaY < 0) {
    e.target.value = +cur + step;
  } else {
    e.target.value -= step;
  }
  e.preventDefault();
  e.stopPropagation();
  valueHandler(e);
};

export default function RangeSlider(props: IRangeSlider) {
  const {
    parentValue,
    setParentValue,
    min,
    max,
    setRangeSliderRef,
    scrollStep,
    keyStep,
    isHorizontal,
    breakpoints,
  } = props;

  const [tempValue, setTempValue] = useState(parentValue);
  const parentRerenderDebounce = useCallback(
    debounce((value) => setParentValue(value), 1000),
    []
  );
  const tempValRerenderDebounce = useCallback(
    debounce((value) => setTempValue(value), 50),
    []
  );
  const valueHandler = useCallback(
    (e) => {
      const curValue = e.target.value;
      parentRerenderDebounce(curValue);
      tempValRerenderDebounce(curValue);
    },
    [parentRerenderDebounce, tempValRerenderDebounce]
  );

  const cb = useCallback(
    (e) => eventWheel(e, valueHandler, scrollStep),
    [valueHandler]
  );
  const [inputRef, setInputRef] = useState(null);
  useCallbackOnWheel(cb, inputRef);

  const RangeOptionsID = useMemo<string>(uuidv4, []);
  return (
    <div
      className={classNames(
        { [styles.horizontal]: min !== max && isHorizontal },
        { [styles.disable]: min === max },
        props.className
      )}
      ref={setRangeSliderRef ?? null}
    >
      <div
        className={classNames(
          styles.container,
          props.colors ?? styles.colorsDefault
        )}
      >
        <input
          className={styles.slider}
          type="range"
          min={min.toString()}
          max={max.toString()}
          step="2"
          onChange={(e) => {
            valueHandler(e);
          }}
          defaultValue={parentValue}
          list={RangeOptionsID}
          ref={setInputRef}
        ></input>
        <span className={styles.tooltip}>{tempValue}</span>
      </div>
      <RangeOptions
        id={RangeOptionsID}
        min={min}
        max={max}
        step={keyStep}
        breakpoints={breakpoints}
      />
    </div>
  );
}
