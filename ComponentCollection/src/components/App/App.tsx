import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import CounterButton from '../../simple/CounterButton/CounterButton';
import RootContainer from '../../UI/RootContainer/RootContainer';

export default function App() {
  return (
    <RootContainer>
      <Viewer fitContent={false} withMobileView={false}>
        <CounterButton></CounterButton>
      </Viewer>
    </RootContainer>
  );
}
