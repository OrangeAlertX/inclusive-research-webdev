import { Dispatch, useEffect, useState } from 'react';

/**
 * If initialState was changed, setState(initialState).
 */
export default function useStateWithUpdate<T>(initialState: T) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  return [state, setState] as [T, Dispatch<T>];
}
