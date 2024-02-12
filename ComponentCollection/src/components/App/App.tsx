import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';
import RootContainer from '../../UI/RootContainer/RootContainer';

export default function App() {
  return (
    <RootContainer>
      <Viewer min={350}>
        <CounterButton></CounterButton>
      </Viewer>
    </RootContainer>
  );
}
