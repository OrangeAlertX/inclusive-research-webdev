import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="*" element={<h1 className={styles.errorNotFound}>404</h1>} />
    </Routes>
  );
}
