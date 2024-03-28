import { Route, Routes } from 'react-router-dom';
import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import RootContainer from '../../UI/RootContainer/RootContainer';
import AboutMe from '../AboutMe/AboutMe';
import MyProjects from '../MyProjects/MyProjects';
import Leetcode from '../Leetcode/Leetcode';
import Contacts from '../Contacts/Contacts';
import global from '../../global.module.css';
import styles from './App.module.css';
import variables from './variables.module.css';
import { useLayoutEffect, useState } from 'react';

export { Viewer };

export default function App() {
  const [viewerHeight, setViewerHeight] = useState(0);

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
    min: 1024,
    max: 1024,
    withFullPage: false,
    withMobileView: true,
    withRangeSlider: false,
    ViewerHeightDefault: viewerHeight,
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Viewer {...viewerProps}>
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
          </Viewer>
        }
      />
    </Routes>
  );
}
