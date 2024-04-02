import {
  useEffect,
  useRef,
  useState,
  MutableRefObject,
  ReactNode,
} from 'react';
import styles from './EmbedComponent.module.css';
import { createPortal } from 'react-dom';
import FullPage from './FullPage/FullPage';
import classNames from 'classnames';
import StylesForIframe_DEV from './StylesForIframeDev';
import StylesForIframe_PROD from './StylesForIframeProd';
import useSize from '../../../utils/customHooks/useSize';

interface IEmbedComponent {
  children: ReactNode | ReactNode[];
  resolution: number;
  fullscreen: boolean;
  toggleFullscreen: () => void;
  RangeSliderRef: Element;
  withRangeSlider: boolean;
  withFullPage: boolean;
  withMobileView: boolean;
  heightAdjust: boolean;
  ViewerHeight: number;
  setViewerHeightHandler: (multiplier: number) => void;
  src: string | null;
}

export default function EmbedComponent(props: IEmbedComponent) {
  const {
    children,
    resolution,
    fullscreen,
    toggleFullscreen,
    RangeSliderRef,
    withRangeSlider,
    withFullPage,
    withMobileView,
    heightAdjust,
    setViewerHeightHandler: setViewerHeight,
    src,
  } = props;

  // className
  const EmbedClassName = classNames(styles.container, {
    [styles.fullscreen]: fullscreen,
  });
  const mainClassName = classNames(styles.main, {
    [styles.fullscreenMain]: fullscreen,
  });

  ////////////////////////////////////////////////////////////////////
  const [ref, setRef] = useState(null);
  const [mainRef, setMainRef] = useState(null);
  const [mainWidth, mainHeight] = useSize(mainRef);
  ////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const iframe = ref;
    if (!iframe) return;
    if (!src) {
      iframe.contentDocument.body.style = `display: flex; justify-content: center; align-items: center;`;
    }
  }, [src, ref, children]);

  // resolution logic
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

  const iframeBody = ref?.contentDocument?.body;
  const stylesIframe = import.meta.env.DEV ? (
    <StylesForIframe_DEV />
  ) : (
    <StylesForIframe_PROD />
  );

  const FullPageProps = {
    className: classNames(styles.FullPage, {
      [styles.FullPageWithoutTransition]: !withRangeSlider,
    }),
    onClick: toggleFullscreen,
  };

  const FullPageComponent = withFullPage ? (
    <>
      {fullscreen && RangeSliderRef ? (
        createPortal(<FullPage {...FullPageProps} />, RangeSliderRef)
      ) : (
        <FullPage {...FullPageProps} />
      )}
    </>
  ) : (
    false
  );

  return (
    <div className={EmbedClassName}>
      <div className={mainClassName} ref={setMainRef}>
        <div className={styles.outer}>
          <iframe src={src} className={styles.inner} ref={setRef}>
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
              iframeBody &&
              createPortal(<div>No content</div>, iframeBody, 'NoContent')}
            {!src &&
              iframeBody &&
              createPortal(stylesIframe, iframeBody, 'injectedStyles')}
            {!src &&
              iframeBody &&
              createPortal(<div>{children}</div>, iframeBody, 'EmbedZoomer')}
          </iframe>
        </div>
      </div>
      {FullPageComponent}
    </div>
  );
}
