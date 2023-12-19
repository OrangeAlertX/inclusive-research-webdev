import { Route, Routes } from 'react-router-dom';
import Viewer from '../Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';
import RootContainer from '../RootContainer/RootContainer';
import routes from './routes';

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
      {routes.map((Component) => (
        <Route
          key={Component.name}
          path={`/components/${Component.name}`}
          element={<Component />}
        />
      ))}
      {/* <Route path="/components/CounterButton" element={<CounterButton />} /> */}
    </Routes>
  );
}
