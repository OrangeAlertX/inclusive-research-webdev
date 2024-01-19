import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import RootContainer from '../../UI/RootContainer/RootContainer';
import variables from './variables.module.css';
import AboutMe from '../AboutMe/AboutMe';
import MyProjects from '../MyProjects/MyProjects';

export default function App() {
  const MyProjectsProps = {
    Viewer,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          // <RootContainer>
          //   <Viewer colors={variables.colors}>
          <RootContainer>
            <>
              <h1 style={{ display: 'none' }}>Веб-разработчик</h1>
              <AboutMe />
              <MyProjects {...MyProjectsProps} />
            </>
          </RootContainer>
          //   </Viewer>
          // </RootContainer>
        }
      />
    </Routes>
  );
}
