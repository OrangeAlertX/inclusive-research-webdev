import { useEffect } from 'react';

export default function useObserver(
  element: Element,
  cb: () => void,
  config: MutationObserverInit
) {
  useEffect(() => {
    if (!element) return;

    const observer = new MutationObserver(cb);
    cb();

    observer.observe(element, config);

    return () => observer.disconnect();
  }, [element]);
}
