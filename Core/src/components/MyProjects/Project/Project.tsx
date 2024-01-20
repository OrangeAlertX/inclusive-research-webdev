import { FaGithub } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import styles from './Project.module.css';
import variables from '../../App/variables.module.css';

interface ProjectData {
  title: string;
  newSkills: string[];
  about: string;
  code: string;
  src: string;
  viewerProps?: {
    min?: number;
    max?: number;
  };
}

interface IProject {
  // children: React.ReactElement | string | JSX.Element;
  project: ProjectData;
  Viewer: React.JSXElementConstructor<any>;
}

Project.defaultProps = {};

export default function Project(props: IProject) {
  const { project, Viewer } = props;

  return (
    <div className={styles.Project}>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>

        <div className={styles.inner}>
          <h4 className={styles.newSkillTitle}>New:</h4>
          {project.newSkills.map((skill) => (
            <div className={styles.newSkill} key={skill}>
              {skill}&#8203;
            </div>
          ))}
          <p>{project.about}</p>
        </div>

        <div className={styles.links}>
          <a target="_blank" href={project.code} className={styles.git}>
            <FaGithub size={'2em'} />
          </a>
          <a target="_blank" href={project.src} className={styles.src}>
            <HiOutlineExternalLink size={'2em'} />
          </a>
        </div>
      </div>
      <div className={styles.viewer}>
        <Viewer
          src={project.src}
          min={project.viewerProps?.min}
          max={project.viewerProps?.max}
          withRangeSlider={false}
          colors={variables.colors}
        ></Viewer>
      </div>
    </div>
  );
}
