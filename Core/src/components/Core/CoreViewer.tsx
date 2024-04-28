import { ReactNode, useContext, useEffect, useRef } from 'react';
import { MobileContext } from '../../utils/Context';
import { Viewer } from '../App/App';
import styles from './Core.module.css';
import variables from '../App/variables.module.css';
import classNames from 'classnames';
import useViewportSize from '../../../../ComponentViewer/src/utils/customHooks/useViewportSize';

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
  const [isMobile, toggleMobile] = useContext(MobileContext);

  const runOnce = useRef(false);
  useEffect(() => {
    if (!viewportWidth) return;
    if (runOnce.current) return;
    runOnce.current = true;

    if (viewportWidth > 1024 && isMobile !== 'desktop') toggleMobile();
    else if (viewportWidth <= 1024 && isMobile !== 'mobile') toggleMobile();
  }, [viewportWidth]);

  const virtualWidth = findVirtualWidth(viewportWidth, isMobile === 'mobile');

  const viewerProps = {
    externalStyles: classNames(variables.colors, styles.fromCore, variables.w),
    withFullPage: false,
    ViewerHeightDefault: 0,
    min: virtualWidth,
    max: virtualWidth,
  };

  return (
    <div className={classNames(styles.Core)}>
      <Viewer {...viewerProps}>{children}</Viewer>
    </div>
  );
}
