import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import variables from '../App/variables.module.css';
// import classNames from 'classnames';
import RootContainer from '../../../../Core/src/UI/RootContainer/RootContainer';
import ButtonPopup from '../ButtonPopup/ButtonPopup';
import Button from '../../UI/Button/Button';

export default function App() {
  return (
    <RootContainer>
      <Viewer
        // externalStyles={classNames(Object.values(variables))}
        fitContent={false}
        withMobileView={false}
        withFullPage={false}
      >
        <ButtonPopup buttonContent={'Nothing'}>EEE</ButtonPopup>
      </Viewer>
      <Button onClick={() => {}}>Button</Button>
    </RootContainer>
  );
}
