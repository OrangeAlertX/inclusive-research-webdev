import { useMemo } from 'react';

interface IViewerRangeOptions {
  min: number;
  max: number;
}

const breakpoints = [
  320, 374, 480, 600, 720, 880, 1024, 1120, 1240, 1360, 1440, 1520, 1600, 1750,
  1900, 2100, 2400, 2560, 2800, 3300,
];

export default function ViewerRangeOptions(props: IViewerRangeOptions) {
  const { min, max } = props;

  const breakpointsOnMinMax = useMemo(() => {
    const newBreakpoints = breakpoints.filter((point) => {
      return point > min && point < max;
    });
    newBreakpoints.push(max);
    newBreakpoints.unshift(min);
    return newBreakpoints;
  }, [min, max]);

  if (min !== max)
    return (
      <datalist id="markersOfRangeSlider">
        {breakpointsOnMinMax.map((point) => {
          return (
            <option key={point} value={point} label={point.toString()}></option>
          );
        })}
      </datalist>
    );

  return null;
}
