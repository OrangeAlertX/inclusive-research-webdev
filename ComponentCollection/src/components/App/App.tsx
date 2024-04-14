import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import variables from '../App/variables.module.css';
import classNames from 'classnames';
import RootContainer from '../../../../Core/src/UI/RootContainer/RootContainer';

export default function App() {
  return (
    <RootContainer>
      <Viewer
        externalStyles={classNames(Object.values(variables))}
        fitContent={false}
        withMobileView={false}
      >
        Nothing
      </Viewer>
    </RootContainer>
  );
}
