import { Children, useEffect, useState } from 'react';
import styles from './EmbedComponent.module.css';
import { createPortal } from 'react-dom';

interface EmbedComponent {
  children: React.ReactElement;
  resolution: number;
}

const mountedObservers = [];
const cssOrLink = (cssLink, updateCssLink) => {
  if (cssLink || typeof window === 'undefined') return cssLink;

  const head = document.head;

  if (import.meta.env.DEV) {
    const styles = head.querySelectorAll('style[type="text/css"]');

    styles.forEach((style) => {
      cssLink += style.innerHTML + ' ';
    });

    const observer = new MutationObserver((mutationsList) => {
      cssLink = '';
      styles.forEach((style) => {
        cssLink += style.innerHTML + ' ';
      });
      updateCssLink(cssLink);
    });
    mountedObservers.push(observer);
    observer.observe(head, { childList: true });
  } else {
    const cssBundle = head.querySelector('link[rel="stylesheet"]');
    cssLink = cssBundle.getAttribute('href');
  }

  return cssLink;
};

export default function EmbedComponent(props: EmbedComponent) {
  const { children, resolution } = props;

  const [ref, setRef] = useState(null);
  const [cssLink, updateCssLink] = useState('');

  useEffect(() => {
    const iframe = ref;

    if (!iframe) return;

    const outer = iframe.parentElement;
    const containerWidth = outer.parentElement.offsetWidth;
    const containerHeight = outer.parentElement.offsetHeight;

    outer.style.setProperty('width', resolution + 'px');
    const multiplier = containerWidth / resolution;
    const adjustHeight =
      containerHeight / 2 - (outer.offsetHeight * multiplier) / 2;
    outer.style.setProperty(
      'transform',
      `scale(${containerWidth / resolution}) translateY(${
        -adjustHeight / multiplier
      }px)`
    );
    iframe.style.setProperty(
      'height',
      (resolution / containerWidth) * outer.offsetHeight + 'px'
    );

    iframe.contentDocument.body.style = `
    display: flex;
    justify-content: center;
    align-items: center;
    `;

    return () => {
      mountedObservers.forEach((observer) => observer.disconnect());
      mountedObservers.length = 0;
    };
  }, [resolution, ref]);

  const mountNode = ref?.contentDocument.body;
  const headStyle = (
    <>
      {import.meta.env.DEV && (
        <style>{cssOrLink(cssLink, updateCssLink)}</style>
      )}
      {import.meta.env.PROD && (
        <link rel="stylesheet" href={cssOrLink(cssLink, updateCssLink)}></link>
      )}
    </>
  );
  const bodyStyleAndChildren = (
    <div style={{ margin: '0 auto' }}>{children}</div>
  );
  return (
    <div className={styles.container}>
      <div className={styles.outer}>
        <iframe className={styles.inner} ref={setRef}>
          {mountNode && createPortal(bodyStyleAndChildren, mountNode, 'first')}
          {mountNode &&
            createPortal(headStyle, ref.contentDocument.head, 'second')}
        </iframe>
      </div>
    </div>
  );
}
