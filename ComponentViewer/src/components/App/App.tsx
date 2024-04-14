import { Route, Routes } from 'react-router-dom';
import Viewer from '../Viewer/Viewer';
import RangeSlider from '../Viewer/RangeSlider/RangeSlider';
import { useState } from 'react';
import RootContainer from '../../../../Core/src/UI/RootContainer/RootContainer';
import Button from '../../../UI/Button/Button';

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
                <Button></Button>
              </Viewer>
              <Viewer withMobileView={false} min={350} max={1920}>
                <Button></Button>
              </Viewer>
              <Viewer withMobileView={false} min={350} max={350}>
                <Button></Button>
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
