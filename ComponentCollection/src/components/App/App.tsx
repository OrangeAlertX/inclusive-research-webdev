import Viewer from '../../../../ComponentViewer/src/components/Viewer/Viewer';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import variables from '../App/variables.module.css';
import classNames from 'classnames';
import RootContainer from '../../../../Core/src/UI/RootContainer/RootContainer';
import { ThemeContextProvider } from '../../../../Core/src/utils/Context';

export default function App() {
  return (
    <RootContainer>
      <Viewer
        externalStyles={classNames(Object.values(variables))}
        fitContent={false}
        withMobileView={false}
      >
        <ThemeContextProvider>
          <ThemeToggle />
        </ThemeContextProvider>
      </Viewer>
    </RootContainer>
  );
}
