import { Route, Routes } from 'react-router-dom';
import Viewer from '../Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';
import RootContainer from '../../UI/RootContainer/RootContainer';
import RangeSlider from '../Viewer/RangeSlider/RangeSlider';
import { useState } from 'react';

export default function App() {
  const [value, setValue] = useState(0);
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
              <Viewer withMobileView={false} min={350} max={1920}>
                <CounterButton></CounterButton>
              </Viewer>
              <Viewer withMobileView={false} min={350} max={350}>
                <CounterButton></CounterButton>
              </Viewer>
              <RangeSlider
                min={150}
                max={550}
                keyStep={10}
                parentValue={value}
                setParentValue={setValue}
                isHorizontal={true}
              ></RangeSlider>
            </Viewer>
          </RootContainer>
        }
      />
    </Routes>
  );
}
