import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import RootContainer from '../../UI/RootContainer/RootContainer';
import variables from './variables.module.css';
import AboutMe from '../AboutMe/AboutMe';
import MyProjects from '../MyProjects/MyProjects';
import { createContext } from 'react';
import styles from './App.module.css';

export const GlobalVariables = createContext(variables);

export default function App() {
  const MyProjectsProps = {
    Viewer,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <GlobalVariables.Provider value={variables}>
            <RootContainer>
              <Viewer colors={variables.colors}>
                <RootContainer
                  className={classNames(styles.root, variables.colors)}
                >
                  <>
                    <h1 style={{ display: 'none' }}>Веб-разработчик</h1>
                    <AboutMe />
                    <MyProjects {...MyProjectsProps} />
                  </>
                </RootContainer>
              </Viewer>
            </RootContainer>
          </GlobalVariables.Provider>
        }
      />
    </Routes>
  );
}
