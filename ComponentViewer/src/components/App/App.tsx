import { Route, Routes } from 'react-router-dom';
import Viewer from '../Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';
import RootContainer from '../../UI/RootContainer/RootContainer';
import FullPage from '../Viewer/EmbedComponent/FullPage/FullPage';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RootContainer>
            <Viewer min={320}>
              <>
                <Viewer min={350} max={1920}>
                  <CounterButton></CounterButton>
                </Viewer>
                <Viewer min={350} max={1920}>
                  <CounterButton></CounterButton>
                </Viewer>
                <Viewer min={350} max={1920}>
                  <CounterButton></CounterButton>
                </Viewer>
              </>
            </Viewer>
          </RootContainer>
        }
      />
    </Routes>
  );
}
