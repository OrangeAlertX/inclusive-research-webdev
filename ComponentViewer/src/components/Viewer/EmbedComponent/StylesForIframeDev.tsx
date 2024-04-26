import { useEffect, useState } from 'react';

export default function StylesForIframe_DEV() {
  const [cssLink, setCssLink] = useState('');

  useEffect(() => {
    const head = document.head;

    const styles = head.querySelectorAll('style[type="text/css"]');
    const cb = () => {
      let tempCssLink = '';
      styles.forEach((style) => {
        tempCssLink += style.innerHTML + ' ';
      });
      setCssLink(tempCssLink);
    };

    const observer = new MutationObserver(cb);
    observer.observe(head, {
      childList: true,
      subtree: true,
    });

    cb();

    return () => {
      observer.disconnect;
    };
  }, []);

  return <style>{cssLink}</style>;
}
