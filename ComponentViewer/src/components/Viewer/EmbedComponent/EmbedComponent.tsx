import { useEffect, useState } from 'react';
import styles from './EmbedComponent.module.css';
import { createPortal } from 'react-dom';
import FullPage from './FullPage/FullPage';
import classNames from 'classnames';

interface IEmbedComponent {
  children?: React.ReactElement | undefined;
  resolution: number;
  fullscreen: boolean;
  onClick: () => void;
  RangeSliderRef: React.MutableRefObject<any>;
  withRangeSlider: boolean;
  withFullPage: boolean;
  heightAdjust: boolean;
  setViewerHeightHandler: (number) => void;
  src?: string | undefined;
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
    //////////
  } else {
    //////////
    const cssBundle = head.querySelector('link[rel="stylesheet"]');
    cssLink = cssBundle.getAttribute('href');
  }

  return cssLink;
};

export default function EmbedComponent(props: IEmbedComponent) {
  const {
    children,
    resolution,
    fullscreen,
    onClick,
    RangeSliderRef,
    withRangeSlider,
    withFullPage,
    heightAdjust,
    setViewerHeightHandler: setViewerHeight,
    src,
  } = props;

  const EmbedClassName = classNames(
    styles.container,
    fullscreen ? styles.fullscreen : false
  );
  const mainClassName = classNames(
    styles.main,
    fullscreen ? styles.fullscreenMain : false
  );

  const [ref, setRef] = useState(null);
  const [cssLink, updateCssLink] = useState('');
  const [mainWidth, setMainWidth] = useState(0);

  useEffect(() => {
    const iframe = ref;
    if (!iframe) return;
    if (!src) {
      iframe.contentDocument.body.style = `display: flex; justify-content: center; align-items: center;`;
    }

    const main = iframe.parentElement.parentElement;

    //state for next useEffect, rerender when size of main is changing
    const cb = () => setMainWidth(main.offsetWidth);
    const resizeObserver = new ResizeObserver(cb);
    resizeObserver.observe(main);

    return () => {
      mountedObservers.forEach((observer) => observer.disconnect());
      mountedObservers.length = 0;

      resizeObserver.disconnect();
    };
  }, [ref, src]);

  useEffect(() => {
    const iframe = ref;
    if (!iframe) return;

    const outer = iframe.parentElement;
    const mainWidth = outer.parentElement.offsetWidth;
    const multiplier = mainWidth / resolution;

    let mainHeight = outer.parentElement.offsetHeight;
    if (heightAdjust && !fullscreen) {
      setViewerHeight(multiplier);
    }

    const height = (resolution / mainWidth) * mainHeight;

    outer.style.setProperty('width', resolution + 'px');
    outer.style.setProperty('height', height + 'px');
    outer.style.setProperty('transform', `scale(${multiplier})`);
    iframe.style.setProperty('height', height + 'px');

    //
  }, [resolution, ref, fullscreen, mainWidth, heightAdjust, setViewerHeight]);

  const mountBody = ref?.contentDocument?.body;
  const mountHead = ref?.contentDocument?.body;
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
  const childrenDiv = <div>{children}</div>;
  const FullPageWithProps = (
    <FullPage
      className={classNames(
        styles.FullPage,
        withRangeSlider ? false : styles.FullPageWithoutTransition
      )}
      onClick={onClick}
    />
  );
  const FullPageComponent = withFullPage ? (
    <>
      {fullscreen
        ? createPortal(FullPageWithProps, RangeSliderRef.current)
        : FullPageWithProps}
    </>
  ) : (
    false
  );

  return (
    <div className={EmbedClassName}>
      <div className={mainClassName}>
        <div className={styles.outer}>
          <iframe src={src ? src : null} className={styles.inner} ref={setRef}>
            {src && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Update your browser
              </div>
            )}
            {!src &&
              !children &&
              mountBody &&
              createPortal(<div>Not Found</div>, mountBody, 'NotFound')}
            {!src &&
              mountHead &&
              createPortal(headStyle, mountHead, 'injectedStyles')}
            {!src &&
              mountBody &&
              createPortal(childrenDiv, mountBody, 'EmbedZoomer')}
          </iframe>
          {FullPageComponent}
        </div>
      </div>
    </div>
  );
}
