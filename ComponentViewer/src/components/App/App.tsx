import { useState } from 'react';
import './App.css';
import Viewer from '../Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';

export default function App() {
  return (
    <>
      <Viewer>
        <CounterButton />
      </Viewer>
    </>
  );
}
