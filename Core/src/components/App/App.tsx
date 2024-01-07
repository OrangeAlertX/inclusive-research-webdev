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
              <>
                <h1 style={{ visibility: 'hidden' }}>
                  Разработчик Богдан Севрук
                </h1>
                <AboutMe />
              </>
            </Viewer>
          </RootContainer>
        }
      />
    </Routes>
  );
}
