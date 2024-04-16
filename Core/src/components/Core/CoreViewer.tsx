import { ReactNode, useContext, useEffect, useState } from 'react';
import { MobileContext } from '../../utils/Context';
import { Viewer } from '../App/App';
import styles from './Core.module.css';
import variables from '../App/variables.module.css';
import classNames from 'classnames';
import useViewportSize from '../../../../ComponentViewer/src/utils/customHooks/useViewportSize';
import waitIframeDocument from '../../../../ComponentViewer/src/utils/asyncTools/waitIframeDocument';

interface ICoreViewer {
  children: ReactNode | ReactNode[];
}

function findVirtualWidth(viewportWidth, isMobile): number {
  const simpleMobile = viewportWidth <= 1024 && isMobile;
  const simpleDesktop = viewportWidth > 1024 && !isMobile;
  const specMobile = viewportWidth > 1024 && isMobile;
  const specDesktop = viewportWidth <= 1024 && !isMobile;

  if (simpleMobile) return viewportWidth;
  else if (simpleDesktop) return Math.min(viewportWidth, 1360);
  else if (specMobile) return 767;
  else if (specDesktop) return 1360;
}

export default function CoreViewer(props: ICoreViewer) {
  const { children } = props;

  const [viewportWidth] = useViewportSize();
  const [isMobile, setIsMobile] = useContext(MobileContext);
  const [htmlHeight, setHtmlHeight] = useState(0);

  const virtualWidth = findVirtualWidth(viewportWidth, isMobile === 'mobile');

  const viewerProps = {
    externalStyles: classNames(variables.colors, styles.fromCore, variables.w),
    withFullPage: false,
    ViewerHeightDefault: htmlHeight,
    min: virtualWidth,
    max: virtualWidth,
  };

  const [Core, setCore] = useState(null);
  // useEffect(() => {
  //   if (!Core) return;
  //   const iframe = Core.querySelector('iframe');

  //   const instance = { isActual: true };
  //   waitIframeDocument(iframe, instance, 200).then((iframeDocument) => {
  //     setHtmlHeight(iframeDocument.body.offsetHeight);
  //   });

  //   return () => {
  //     instance.isActual = false;
  //   };
  // }, [Core, virtualWidth]);

  return (
    <div className={classNames(styles.Core)} ref={setCore}>
      <Viewer {...viewerProps}>{children}</Viewer>
    </div>
  );
}
