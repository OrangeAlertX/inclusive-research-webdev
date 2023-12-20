import { Route, Routes } from 'react-router-dom';
import Viewer from '../Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';
import RootContainer from '../RootContainer/RootContainer';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RootContainer>
            <Viewer isEmbed>
              <CounterButton />
            </Viewer>
          </RootContainer>
        }
      />
    </Routes>
  );
}
