import { Route, Routes } from 'react-router-dom';
import Viewer from '../Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';
import RootContainer from '../../UI/RootContainer/RootContainer';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RootContainer>
            <Viewer min={320}>
              <Viewer withMobileView={false} min={350} max={350}>
                <CounterButton></CounterButton>
              </Viewer>
              <Viewer
                withMobileView={false}
                withRangeSlider={false}
                min={350}
                max={1920}
              >
                <CounterButton></CounterButton>
              </Viewer>
              <Viewer withMobileView={false} min={350} max={1920}>
                <CounterButton></CounterButton>
              </Viewer>
            </Viewer>
          </RootContainer>
        }
      />
    </Routes>
  );
}
