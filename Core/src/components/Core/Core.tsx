import styles from './Core.module.css';
import RootContainer from '../../UI/RootContainer/RootContainer';
import AboutMe from '../AboutMe/AboutMe';
import MyProjects from '../MyProjects/MyProjects';
import Leetcode from '../Leetcode/Leetcode';
import Contacts from '../Contacts/Contacts';
import global from '../../global.module.css';
import variables from '../App/variables.module.css';
import classNames from 'classnames';
import { Viewer } from '../App/App';
import { useEffect, useMemo, useState } from 'react';
import useViewportSize from '../../../../ComponentViewer/src/utils/customHooks/useViewportSize';
import { ThemeContextProvider } from '../../utils/Context';

interface ICore {}

Core.defaultProps = {};

export default function Core(props: ICore) {
  const {} = props;

  const [viewportWidth, viewportHeight] = useViewportSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!viewportWidth) return;

    if (viewportWidth <= 1024) {
      setIsMobile(true);
    } else setIsMobile(false);
  }, [viewportWidth]);

  const simpleMobile = viewportWidth <= 1024 && isMobile;
  const simpleDesktop = viewportWidth > 1024 && !isMobile;
  const specMobile = viewportWidth > 1024 && isMobile;
  const specDesktop = viewportWidth <= 1024 && !isMobile;

  let virtualWidth = 0;
  if (simpleMobile || simpleDesktop) virtualWidth = viewportWidth;
  else if (specMobile) virtualWidth = 767;
  else if (specDesktop) virtualWidth = 1920;

  const viewerProps = {
    externalStyles: classNames(variables.colors, styles.fromCore, variables.w),
    min: virtualWidth,
    max: virtualWidth,
    withFullPage: false,
    // withMobileView: false,
    ViewerHeightDefault: viewportHeight,
  };

  const ViewerChildrenMemo = useMemo(() => {
    return (
      <div className={styles.container}>
        <RootContainer
          className={classNames(styles.root100, Object.values(variables))}
          rootStyles={styles.root}
        >
          <Contacts />
        </RootContainer>
        <RootContainer>
          <h1 className={global.disable}>Веб-разработчик</h1>
          <AboutMe />
          <Leetcode />
          <MyProjects />
        </RootContainer>
        <RootContainer
          className={classNames(styles.root100, Object.values(variables))}
          rootStyles={styles.root}
        >
          <Contacts />
        </RootContainer>
      </div>
    );
  }, []);

  return (
    <ThemeContextProvider>
      <div className={classNames(styles.Core)}>
        <Viewer {...viewerProps}>{ViewerChildrenMemo}</Viewer>
      </div>
    </ThemeContextProvider>
  );
}
