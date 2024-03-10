import {
  useEffect,
  useRef,
  useState,
  ReactElement,
  MutableRefObject,
} from 'react';
import styles from './EmbedComponent.module.css';
import { createPortal } from 'react-dom';
import FullPage from './FullPage/FullPage';
import classNames from 'classnames';

interface IEmbedComponent {
  children?: ReactElement | undefined;
  resolution: number;
  fullscreen: boolean;
  onClick: () => void;
  RangeSliderRef: MutableRefObject<any>;
  withRangeSlider: boolean;
  withFullPage: boolean;
  withMobileView: boolean;
  heightAdjust: boolean;
  ViewerHeight: number;
  setViewerHeightHandler: (multiplier: number) => void;
  src?: string | undefined;
}

const cssOrLink = (cssLink, updateCssLink, mountedObservers) => {
  if (cssLink || typeof window === 'undefined') return cssLink;

  const head = document.head;

  if (import.meta.env.DEV) {
    const styles = head.querySelectorAll('style[type="text/css"]');

    styles.forEach((style) => {
      cssLink += style.innerHTML + ' ';
    });

    const observer = new MutationObserver(() => {
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
    withMobileView,
    heightAdjust,
    ViewerHeight,
    setViewerHeightHandler: setViewerHeight,
    src,
  } = props;

  // className
  const EmbedClassName = classNames(
    styles.container,
    fullscreen ? styles.fullscreen : false
  );
  const mainClassName = classNames(
    styles.main,
    fullscreen ? styles.fullscreenMain : false
  );

  ////////////////////////////////////////////////////////////////////
  const [ref, setRef] = useState(null);
  const [cssLink, updateCssLink] = useState('');
  const [mainWidth, setMainWidth] = useState(0);
  const [mainHeight, setMainHeight] = useState(ViewerHeight);
  ////////////////////////////////////////////////////////////////////

  const mountedObservers = useRef([]);
  useEffect(() => {
    const iframe = ref;
    if (!iframe) return;
    if (!src) {
      iframe.contentDocument.body.style = `display: flex; justify-content: center; align-items: center;`;
    }

    const main = iframe.parentElement.parentElement;

    //states for rerender when size of Viewer is changing
    const cb = () => {
      setMainHeight(main.offsetHeight);
      setMainWidth(main.offsetWidth);
    };
    const resizeObserver = new ResizeObserver(cb);
    resizeObserver.observe(main);

    return () => {
      mountedObservers.current.forEach((observer) => observer.disconnect());
      mountedObservers.current.length = 0; // eslint-disable-line

      resizeObserver.disconnect();
    };
  }, [ref, src]);

  useEffect(() => {
    const iframe = ref;
    if (!iframe) return;

    const outer = iframe.parentElement;

    const multiplier = mainWidth / resolution;

    if (heightAdjust && !fullscreen) {
      setViewerHeight(multiplier);
    }

    const height = (resolution / mainWidth) * mainHeight;

    outer.style.setProperty('width', resolution + 'px');
    outer.style.setProperty('height', height + 'px');
    outer.style.setProperty('transform', `scale(${multiplier})`);

    let multiplierMobile = 1;
    if (withMobileView && window.innerWidth > 1024 && resolution <= 1024) {
      const targetAspectRatio = resolution > 768 ? 4 / 3 : 16 / 9;
      const currentAspectRatio = height / resolution;

      multiplierMobile = targetAspectRatio / currentAspectRatio;
    }
    iframe.style.setProperty('height', height * multiplierMobile + 'px');

    if (multiplierMobile !== 1) {
      const scale = 1 / multiplierMobile;
      const translate = 50 * (multiplierMobile - 1);

      iframe.style.setProperty(
        'transform',
        `scale(${scale}) translateY(-${translate}%)`
      );
    } else if (iframe.style.getPropertyValue('transform')) {
      iframe.style.setProperty('transform', '');
    }
    //
  }, [
    resolution,
    ref,
    fullscreen,
    mainWidth,
    mainHeight,
    heightAdjust,
    setViewerHeight,
  ]);

  const mountBody = ref?.contentDocument?.body;
  const mountHead = ref?.contentDocument?.body;
  const headStyle = (
    <>
      {import.meta.env.DEV && (
        <style>
          {cssOrLink(cssLink, updateCssLink, mountedObservers.current)}
        </style>
      )}
      {import.meta.env.PROD && (
        <link
          rel="stylesheet"
          href={cssOrLink(cssLink, updateCssLink, mountedObservers.current)}
        ></link>
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
        </div>
      </div>
      {FullPageComponent}
    </div>
  );
}
