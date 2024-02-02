import { Route, Routes } from 'react-router-dom';
import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import RootContainer from '../../UI/RootContainer/RootContainer';
import AboutMe from '../AboutMe/AboutMe';
import MyProjects from '../MyProjects/MyProjects';
import Leetcode from '../Leetcode/Leetcode';
import Contacts from '../Contacts/Contacts';

export default function App() {
  const MyProjectsProps = {
    Viewer,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RootContainer>
            <>
              <h1 style={{ display: 'none' }}>Веб-разработчик</h1>
              <AboutMe />
              <Leetcode Viewer={Viewer} />
              <MyProjects {...MyProjectsProps} />
              <Contacts />
            </>
          </RootContainer>
        }
      />
    </Routes>
  );
}
