import { Route, Routes } from 'react-router-dom';
import './App.css';
import Viewer from '../Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Viewer>
            <CounterButton />
          </Viewer>
        }
      />
    </Routes>
  );
}
