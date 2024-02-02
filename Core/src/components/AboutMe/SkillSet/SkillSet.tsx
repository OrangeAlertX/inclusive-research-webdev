import { Fragment } from 'react';
import classNames from 'classnames';
import styles from './SkillSet.module.css';
import variables from '../../App/variables.module.css';

interface ISkillSet {
  // children: React.ReactElement | string | JSX.Element;
  title: string;
  skills: string[];
}

SkillSet.defaultProps = {};

export default function SkillSet(props: ISkillSet) {
  const { title, skills } = props;

  return (
    <div className={classNames(styles.SkillSet, variables.colors)}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.skills}>
        {skills.map((skill, i) => {
          return (
            <Fragment key={skill}>
              <span>{skill}</span>
              {i + 1 < skills.length && <>,&#32;</>}
            </Fragment>
          );
        })}
      </p>
    </div>
  );
}
