import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import RootContainer from '../../UI/RootContainer/RootContainer';
import LightDarkToggle from '../ThemeToggle/ThemeToggle';
import variables from '../App/variables.module.css';
import classNames from 'classnames';

export default function App() {
  return (
    <RootContainer>
      <Viewer
        externalStyles={classNames(Object.values(variables))}
        fitContent={false}
        withMobileView={false}
      >
        <LightDarkToggle />
      </Viewer>
    </RootContainer>
  );
}
