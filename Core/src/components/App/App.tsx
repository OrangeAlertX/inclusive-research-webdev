import { Route, Routes } from 'react-router-dom';
import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import Core from '../Core/Core';
import AppCollection from '../../../../ComponentCollection/src/components/App/App';
import styles from './App.module.css';

export { Viewer };

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Core />} />
      <Route path="/collection" element={<AppCollection />} />
      <Route path="*" element={<h1 className={styles.errorNotFound}>404</h1>} />
    </Routes>
  );
}
