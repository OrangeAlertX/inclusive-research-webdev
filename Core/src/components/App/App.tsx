import { Route, Routes } from 'react-router-dom';
import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';
import RootContainer from '../../UI/RootContainer/RootContainer';
import variables from './var.module.css';
import AboutMe from '../AboutMe/AboutMe';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RootContainer>
            <Viewer colors={variables.colors} min={320}>
              <RootContainer>
                <>
                  <h1 style={{ display: 'none' }}>Веб-разработчик</h1>
                  <AboutMe />
                </>
              </RootContainer>
            </Viewer>
          </RootContainer>
        }
      />
    </Routes>
  );
}
