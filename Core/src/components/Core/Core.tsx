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
import { useContext, useMemo } from 'react';
import useViewportSize from '../../../../ComponentViewer/src/utils/customHooks/useViewportSize';
import {
  MobileContext,
  MobileContextProvider,
  ThemeContextProvider,
} from '../../utils/Context';

interface ICore {}

Core.defaultProps = {};

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

export default function Core(props: ICore) {
  const {} = props;

  const [viewportWidth, viewportHeight] = useViewportSize();

  // useEffect(() => {
  //   if (!viewportWidth) return;

  //   if (viewportWidth <= 1024) {
  //     setIsMobile('mobile');
  //   } else {setIsMobile('desktop')};
  // }, [viewportWidth]);

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

  const viewerProps = {
    externalStyles: classNames(variables.colors, styles.fromCore, variables.w),
    withFullPage: false,
    ViewerHeightDefault: viewportHeight,
  };

  return (
    <ThemeContextProvider>
      <MobileContextProvider>
        <MobileContext.Consumer>
          {([isMobile, setIsMobile]) => {
            const virtualWidth = findVirtualWidth(
              viewportWidth,
              isMobile === 'mobile'
            );

            return (
              <div className={classNames(styles.Core)}>
                <Viewer {...viewerProps} min={virtualWidth} max={virtualWidth}>
                  {ViewerChildrenMemo}
                </Viewer>
              </div>
            );
          }}
        </MobileContext.Consumer>
      </MobileContextProvider>
    </ThemeContextProvider>
  );
}
