import styles from './MyProjects.module.css';
import Project from './Project/Project';

interface IMyProjects {
  // children: React.ReactElement | string | JSX.Element;
  Viewer: React.JSXElementConstructor<any>;
}

MyProjects.defaultProps = {};

const projectStatic = {
  title: 'Cтатичный лэндинг',
  newSkills: ['CSS', 'HTML'],
  about:
    'Мой первый проект, сделан по учебному макету Figma, который включает в себя все основы верстки и каскадных стилей.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Landing-Page-Static',
  src: `/projects/static-landing`,
  viewerProps: {
    min: 1360,
    max: 1360,
  },
};

const projectAdaptive = {
  title: 'Адаптивный лэндинг',
  newSkills: ['SCSS', 'JS', 'Адаптивность'],
  about:
    'Сделан по учебному макету Figma для продвинутого изучения верстки и каскадных стилей.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Landing-Page-Static',
  src: `/projects/adaptive-landing`,
};

const projects = [projectStatic, projectAdaptive];

export default function MyProjects(props: IMyProjects) {
  const { Viewer } = props;

  const ProjectWithViewer = (project) => {
    return <Project {...project} Viewer={Viewer} />;
  };

  return (
    <div className={styles.MyProjects}>
      <h2 className={styles.title}>Проекты</h2>
      {projects.map((project) => {
        return <ProjectWithViewer key={project.src} project={project} />;
      })}
    </div>
  );
}
