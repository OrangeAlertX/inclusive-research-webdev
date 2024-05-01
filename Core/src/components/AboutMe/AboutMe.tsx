import classNames from 'classnames';
import styles from './AboutMe.module.css';
import SkillSet from './SkillSet/SkillSet';
import variables from '../App/variables.module.css';
import { skillSets } from '../../data/skillSets';

interface IAboutMe {
  // children?: React.ReactElement | string | JSX.Element;
}

AboutMe.defaultProps = {};

export default function AboutMe(props: IAboutMe) {
  const {} = props;

  return (
    <div className={classNames(styles.AboutMe, variables.colors)}>
      <h2 className={styles.title}>Богдан Севрук</h2>

      {skillSets.map((skillSetProp) => (
        <SkillSet key={skillSetProp.title} {...skillSetProp} />
      ))}
    </div>
  );
}
