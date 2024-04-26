import { useEffect, useState } from 'react';

export default function StylesForIframe_PROD() {
  const [cssLink, setCssLink] = useState('');

  useEffect(() => {
    const head = document.head;

    const cssBundle = head.querySelector('link[rel="stylesheet"]');
    setCssLink(cssBundle.getAttribute('href'));
  }, []);

  return <link rel="stylesheet" href={cssLink}></link>;
}
