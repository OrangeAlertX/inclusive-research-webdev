import styles from './MyProjects.module.css';
import Project from './Project/Project';
import { Viewer } from '../App/App';
import { projects } from '../../data/projectList';

interface IMyProjects {
  // children: ReactNode | ReactNode[];
}

MyProjects.defaultProps = {};

export default function MyProjects(props: IMyProjects) {
  const {} = props;

  const ProjectWithViewer = (project) => {
    return <Project {...project} Viewer={Viewer} />;
  };

  return (
    <div className={styles.MyProjects}>
      <h2 className={styles.title}>Проекты</h2>
      {projects.map((project) => {
        return <ProjectWithViewer key={project.title} project={project} />;
      })}
    </div>
  );
}
