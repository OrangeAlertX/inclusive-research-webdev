import { useEffect, useLayoutEffect, useState } from 'react';
import styles from './EmbedComponent.module.css';
import { createPortal } from 'react-dom';
import FullPage from './FullPage/FullPage';

interface IEmbedComponent {
  children: React.ReactElement;
  resolution: number;
  fullscreen: boolean;
  onClick: () => void;
  RangeSliderRef: React.MutableRefObject<any>;
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

export default function EmbedComponent(props: IEmbedComponent) {
  const { children, resolution, fullscreen, onClick, RangeSliderRef } = props;

  const [ref, setRef] = useState(null);
  const [cssLink, updateCssLink] = useState('');
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const iframe = ref;
    if (!iframe) return;

    iframe.contentDocument.body.style = `display: flex; justify-content: center; align-items: center;`;

    const container = iframe.parentElement.parentElement;

    const cb = () => setContainerWidth(container.offsetWidth);
    const resizeObserver = new ResizeObserver(cb);
    resizeObserver.observe(container);

    return () => {
      mountedObservers.forEach((observer) => observer.disconnect());
      mountedObservers.length = 0;

      resizeObserver.disconnect();
    };
  }, [ref]);

  useEffect(() => {
    const iframe = ref;
    if (!iframe) return;

    const outer = iframe.parentElement;
    const containerWidth = outer.parentElement.offsetWidth;
    const containerHeight = outer.parentElement.offsetHeight;

    const multiplier = containerWidth / resolution;
    const height = (resolution / containerWidth) * containerHeight + 'px';

    outer.style.setProperty('width', resolution + 'px');
    outer.style.setProperty('height', height);
    outer.style.setProperty('transform', `scale(${multiplier})`);
    iframe.style.setProperty('height', height);
  }, [resolution, ref, fullscreen, containerWidth]);

  const mountBody = ref?.contentDocument.body;
  const mountHead = ref?.contentDocument.body;
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
  const childrenDiv = <div style={{ margin: '0 auto' }}>{children}</div>;
  const FullPageWithProps = (
    <FullPage className={styles.FullPage} onClick={onClick} />
  );

  return (
    <div
      className={styles.container + (fullscreen ? ' ' + styles.fullscreen : '')}
    >
      <div
        className={
          styles.main + (fullscreen ? ' ' + styles.fullscreenMain : '')
        }
      >
        <div className={styles.outer}>
          <iframe className={styles.inner} ref={setRef}>
            {mountBody && createPortal(childrenDiv, mountBody, 'embedZoomer')}
            {mountHead && createPortal(headStyle, mountHead, 'injectedStyles')}
          </iframe>
        </div>
      </div>
      {fullscreen
        ? createPortal(FullPageWithProps, RangeSliderRef.current)
        : FullPageWithProps}
    </div>
  );
}
