import { useEffect } from 'react';

export default function useObserver(
  selector: string,
  cb: () => void,
  config: MutationObserverInit
) {
  useEffect(() => {
    const htmlElement = document.querySelector(selector);

    const observer = new MutationObserver(cb);
    cb();

    observer.observe(htmlElement, config);

    return () => observer.disconnect();
  }, []);
}
