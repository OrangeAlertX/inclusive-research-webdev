import { useEffect, useState, ReactNode, useContext } from 'react';
import styles from './EmbedComponent.module.css';
import { createPortal } from 'react-dom';
import FullPage from './FullPage/FullPage';
import classNames from 'classnames';
import StylesForIframe_DEV from './StylesForIframeDev';
import StylesForIframe_PROD from './StylesForIframeProd';
import useSize from '../../../utils/customHooks/useSize';
import Overlay from '../../../UI/Overlay/Overlay';
import { ThemeContext } from '../../../../../Core/src/utils/Context';
import waitIframeDocument from '../../../utils/asyncTools/waitIframeDocument';

interface IEmbedComponent {
  children: ReactNode | ReactNode[];
  resolution: number;
  fullscreen: boolean;
  toggleFullscreen: () => void;
  RangeSliderRef: Element;
  withRangeSlider: boolean;
  withFullPage: boolean;
  withMobileView: boolean;
  fitContent: boolean;
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
    fitContent,
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
  const [iframeRef, setIframeRef] = useState(null);
  const [iframeClass, setIframeClass] = useState(styles.inner);
  const [mainRef, setMainRef] = useState(null);
  const [mainWidth, mainHeight] = useSize(mainRef);
  const [theme] = useContext(ThemeContext);
  ////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!iframeRef) return;

    const instance = { isActual: true };
    if (src) {
      waitIframeDocument(iframeRef, instance, 500).then((iframeDocument) => {
        if (typeof iframeDocument === 'boolean') return;

        iframeDocument.documentElement.setAttribute('data-theme', theme);
      });

      return () => {
        instance.isActual = false;
      };
    } else {
      iframeRef.contentDocument.documentElement.setAttribute(
        'data-theme',
        theme
      );
    }
  }, [theme, iframeRef]);

  useEffect(() => {
    if (!iframeRef) return;
    if (!src) {
      const body = iframeRef.contentDocument.body;
      const centered = `display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; flex: 1;`;
      body.querySelector('div').style = centered;
    }
  }, [src, iframeRef, children]);

  // resolution logic
  useEffect(() => {
    if (!iframeRef) return;

    const outer = iframeRef.parentElement;

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
    iframeRef.style.setProperty('height', height * multiplierMobile + 'px');

    if (multiplierMobile !== 1) {
      const scale = 1 / multiplierMobile;
      const translate = 50 * (multiplierMobile - 1);

      iframeRef.style.setProperty(
        'transform',
        `scale(${scale}) translateY(-${translate}%)`
      );
    } else if (iframeRef.style.getPropertyValue('transform')) {
      iframeRef.style.setProperty('transform', '');
    }
    setIframeClass(
      classNames(styles.inner, {
        [styles.mobileOutline]: iframeRef?.style.getPropertyValue('transform'),
      })
    );
    //
  }, [
    resolution,
    iframeRef,
    fullscreen,
    mainWidth,
    mainHeight,
    heightAdjust,
    setViewerHeight,
  ]);

  const iframeBody = iframeRef?.contentDocument?.body;
  const stylesIframe = import.meta.env.DEV ? (
    <StylesForIframe_DEV />
  ) : (
    <StylesForIframe_PROD />
  );

  const FullPageProps = {
    className: classNames(styles.FullPage, {
      [styles.FullPageWithoutTransition]: !withRangeSlider || fitContent,
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
          <iframe src={src} className={iframeClass} ref={setIframeRef}>
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
              createPortal(
                <>
                  {stylesIframe}
                  <div>{children}</div>
                </>,
                iframeBody,
                'EmbedZoomer'
              )}
          </iframe>
        </div>
      </div>
      {FullPageComponent}
      {withFullPage && <Overlay></Overlay>}
    </div>
  );
}
