import { useContext, useState } from 'react';
import styles from './MyProjects.module.css';
import Project from '../Project/Project';
import CounterButton from '../../simple/CounterButton/CounterButton';
import { GlobalVariables } from '../App/App';

interface IMyProjects {
  // children: React.ReactElement | string | JSX.Element;
  Viewer: React.JSXElementConstructor<any>;
}

MyProjects.defaultProps = {};

export default function MyProjects(props: IMyProjects) {
  const { Viewer } = props;

  const colors = useContext(GlobalVariables).colors;

  return (
    <div className={styles.MyProjects + ' ' + colors}>
      <h2 className={styles.title}>Проекты</h2>
      <Project>
        <Viewer colors={colors} withRangeSlider={false}>
          <CounterButton />
        </Viewer>
      </Project>
    </div>
  );
}
