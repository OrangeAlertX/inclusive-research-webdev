import { Route, Routes } from 'react-router-dom';
import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import Core from '../Core/Core';
import AppCollection from '../../../../ComponentCollection/src/components/App/App';

export { Viewer };

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Core />} />
      <Route path="/collection" element={<AppCollection />} />
    </Routes>
  );
}
