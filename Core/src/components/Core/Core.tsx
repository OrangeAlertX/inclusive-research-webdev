import styles from './Core.module.css';
import RootContainer from '../../UI/RootContainer/RootContainer';
import AboutMe from '../AboutMe/AboutMe';
import MyProjects from '../MyProjects/MyProjects';
import Leetcode from '../Leetcode/Leetcode';
import Contacts from '../Contacts/Contacts';
import global from '../../global.module.css';
import variables from '../App/variables.module.css';
import classNames from 'classnames';
import { useMemo } from 'react';
import {
  MobileContextProvider,
  ThemeContextProvider,
} from '../../utils/Context';
import CoreViewer from './CoreViewer';

interface ICore {}

Core.defaultProps = {};

export default function Core(props: ICore) {
  const {} = props;

  const ViewerChildrenMemo = useMemo(() => {
    return (
      <div className={styles.container}>
        <RootContainer
          className={classNames(styles.root100, Object.values(variables))}
          rootStyles={styles.root}
        >
          <Contacts />
        </RootContainer>
        <RootContainer>
          <h1 className={global.disable}>Веб-разработчик</h1>
          <AboutMe />
          <Leetcode />
          <MyProjects />
        </RootContainer>
        <RootContainer
          className={classNames(styles.root100, Object.values(variables))}
          rootStyles={styles.root}
        >
          <Contacts />
        </RootContainer>
      </div>
    );
  }, []);

  return (
    <ThemeContextProvider>
      <MobileContextProvider>
        <CoreViewer>{ViewerChildrenMemo}</CoreViewer>
      </MobileContextProvider>
    </ThemeContextProvider>
  );
}
