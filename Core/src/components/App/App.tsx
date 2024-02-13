import { Route, Routes } from 'react-router-dom';
import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import RootContainer from '../../UI/RootContainer/RootContainer';
import AboutMe from '../AboutMe/AboutMe';
import MyProjects from '../MyProjects/MyProjects';
import Leetcode from '../Leetcode/Leetcode';
import Contacts from '../Contacts/Contacts';
import global from '../../global.module.css';
import styles from './App.module.css';

export { Viewer };

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
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
        }
      />
    </Routes>
  );
}
