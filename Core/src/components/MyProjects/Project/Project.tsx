import { HiOutlineExternalLink } from 'react-icons/hi';
import styles from './Project.module.css';
import variables from '../../App/variables.module.css';
import { Viewer } from '../../App/App';
import ButtonPopup from '../../../../../ComponentCollection/src/components/ButtonPopup/ButtonPopup';
import { FaGithub } from 'react-icons/fa';

export interface ProjectData {
  title: string;
  newSkills: string[];
  about: string;
  code: string;
  src?: string;
  viewerProps?: {
    min?: number;
    max?: number;
  };
  details?: React.FC;
}

interface IProject {
  // children: React.ReactElement | string | JSX.Element;
  project: ProjectData;
}

Project.defaultProps = {};

export default function Project(props: IProject) {
  const { project } = props;
  const Details = project.details;

  if (project.src && (import.meta.env?.BASE_URL || process?.env.BASE))
    project.src = `${import.meta.env?.BASE_URL || process?.env.BASE}/${
      project.src
    }`;

  return (
    <div className={styles.Project}>
      <div className={styles.content}>
        <div className={styles.flexbox}>
          <div>
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
          </div>

          {Details && (
            <ButtonPopup
              classNamePopup={styles.popup}
              buttonContent={'Подробнее'}
            >
              {<Details />}
            </ButtonPopup>
          )}
        </div>

        <div className={styles.links}>
          <a target="_blank" href={project.code}>
            <FaGithub size={'2em'} />
          </a>
          {project.src && (
            <a target="_blank" href={project.src}>
              <HiOutlineExternalLink size={'2em'} />
            </a>
          )}
        </div>
      </div>
      <div className={styles.viewer}>
        {project.src && (
          <Viewer
            src={project.src}
            min={project.viewerProps?.min}
            max={project.viewerProps?.max}
            externalStyles={variables.colors}
          ></Viewer>
        )}
      </div>
    </div>
  );
}
