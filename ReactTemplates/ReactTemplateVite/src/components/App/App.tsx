import { Route, Routes } from 'react-router-dom';
import Viewer from '../../../../../ComponentViewer/src/components/Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';
import RootContainer from '../../UI/RootContainer/RootContainer';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RootContainer>
            <Viewer min={350}>
              <CounterButton></CounterButton>
            </Viewer>
          </RootContainer>
        }
      />
    </Routes>
  );
}
