import styles from './MyProjects.module.css';
import Project from '../Project/Project';
import variables from '../App/variables.module.css';

interface IMyProjects {
  // children: React.ReactElement | string | JSX.Element;
  Viewer: React.JSXElementConstructor<any>;
}

MyProjects.defaultProps = {};

export default function MyProjects(props: IMyProjects) {
  const { Viewer } = props;

  return (
    <div className={styles.MyProjects}>
      <h2 className={styles.title}>Проекты</h2>
      <Project>
        <Viewer
          src="/projects"
          colors={variables.colors}
          min="1360"
          max="1360"
          withRangeSlider={false}
        ></Viewer>
      </Project>
    </div>
  );
}
