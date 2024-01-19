import styles from './MyProjects.module.css';
import Project from './Project/Project';
import variables from '../App/variables.module.css';

interface IMyProjects {
  // children: React.ReactElement | string | JSX.Element;
  Viewer: React.JSXElementConstructor<any>;
}

MyProjects.defaultProps = {};

const domain = '';

const projectStatic = {
  title: 'Cтатический лэндинг',
  newSkills: ['CSS', 'HTML'],
  about:
    'Мой первый проект, сделан по учебному макету Figma, который включает в себя все основы верстки и каскадных стилей.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Landing-Page-Static',
  blank: `/projects/StaticLanding`,
};

export default function MyProjects(props: IMyProjects) {
  const { Viewer } = props;

  return (
    <div className={styles.MyProjects}>
      <h2 className={styles.title}>Проекты</h2>
      <Project project={projectStatic}>
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
