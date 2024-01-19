import { FaGithub } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import styles from './Project.module.css';

interface ProjectData {
  title: string;
  newSkills: string[];
  about: string;
  code: string;
  blank: string;
}

interface IProject {
  children: React.ReactElement | string | JSX.Element;
  project: ProjectData;
}

Project.defaultProps = {};

export default function Project(props: IProject) {
  const { children, project } = props;

  return (
    <div className={styles.Project}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.title}</h3>
          <div className={styles.links}>
            <a target="_blank" href={project.code} className={styles.git}>
              <FaGithub size={'2em'} />
            </a>
            <a target="_blank" href={project.blank} className={styles.blank}>
              <HiOutlineExternalLink size={'2em'} />
            </a>
          </div>
        </div>
        <div className={styles.inner}>
          <h4 className={styles.newSkillTitle}>New:</h4>
          {project.newSkills.map((skill) => (
            <div className={styles.newSkill} key={skill}>
              {skill}
            </div>
          ))}
          <p>{project.about}</p>
        </div>
      </div>
      <div className={styles.viewer}>{children}</div>
    </div>
  );
}
