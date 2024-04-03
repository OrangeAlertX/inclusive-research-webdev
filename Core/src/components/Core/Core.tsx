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
import { useLayoutEffect, useState } from 'react';

interface ICore {}

Core.defaultProps = {};

export default function Core(props: ICore) {
  const {} = props;

  const [viewerHeight, setViewerHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  // const width = useWidth(1920);
  const width = 1920;

  useLayoutEffect(() => {
    setViewerHeight(window.innerHeight);

    const cb = () => {
      setViewerHeight(window.innerHeight);
    };

    const resizeObserver = new ResizeObserver(cb);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  const viewerProps = {
    colors: variables.colors,
    min: isMobile ? 767 : width,
    max: isMobile ? 767 : width,
    withFullPage: false,
    withMobileView: true,
    withRangeSlider: false,
    ViewerHeightDefault: viewerHeight,
  };

  return (
    <div className={classNames(styles.Core, variables.w)}>
      {/* <Viewer {...viewerProps}> */}
      <>
        <RootContainer className={styles.root100}>
          <Contacts />
        </RootContainer>
        <RootContainer>
          <>
            <h1 className={global.disable}>Веб-разработчик</h1>
            <AboutMe />
            <Leetcode />
            <MyProjects />
          </>
        </RootContainer>
        <RootContainer className={styles.root100}>
          <Contacts />
        </RootContainer>
      </>
      {/* </Viewer> */}
    </div>
  );
}
