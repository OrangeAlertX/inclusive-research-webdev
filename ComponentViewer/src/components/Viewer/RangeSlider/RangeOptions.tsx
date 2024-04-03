import { useMemo } from 'react';

interface IRangeOptions {
  min?: number;
  max?: number;
  step: number;
  breakpoints?: readonly number[];
  id: string;
}

RangeOptions.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
};

const generateBreakpoints = (min, max, step) => {
  const breakpoints = [];
  for (let i = min; i <= max; i += step) {
    breakpoints.push(i);
  }
  return [breakpoints, min, max] as [number[], number, number];
};
const filterBreakpoints = (
  breakpoints: number[] | readonly number[],
  min: number,
  max: number
) => {
  const newBreakpoints = breakpoints.filter((point) => {
    return point > min && point < max;
  });
  newBreakpoints.push(max);
  newBreakpoints.unshift(min);
  return [newBreakpoints, min, max] as [number[], number, number];
};

export default function RangeOptions(props: IRangeOptions) {
  const { min, max, breakpoints, id, step } = props;

  const [breakpointsOnMinMax, culcMin, culcMax] = useMemo(() => {
    const [culcMin, culcMax] = min > max ? [max, min] : [min, max];
    if (breakpoints) {
      return filterBreakpoints(breakpoints, culcMin, culcMax);
    }

    if (step === 0) throw new Error('step === 0');

    const newBreakpoints = generateBreakpoints(culcMin, culcMax, step);
    return [newBreakpoints, culcMin, culcMax];
  }, [min, max, breakpoints]);

  if (culcMin !== culcMax)
    return (
      <datalist id={id}>
        {breakpointsOnMinMax.map((point) => {
          return (
            <option key={point} value={point} label={point.toString()}></option>
          );
        })}
      </datalist>
    );

  return null;
}
