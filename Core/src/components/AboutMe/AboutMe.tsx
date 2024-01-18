import classNames from 'classnames';
import styles from './AboutMe.module.css';
import SkillSet from './SkillSet/SkillSet';
import variables from '../App/variables.module.css';

interface IAboutMe {
  children?: React.ReactElement | string | JSX.Element;
}

AboutMe.defaultProps = {};

const Frontend = {
  title: 'Frontend',
  skills: [
    'React',
    'TypeScript/JavaScript',
    'SCSS/CSS',
    'Vite/Webpack',
    'HTML',
    'Figma',
  ],
};
const Backend = {
  title: 'Backend',
  skills: ['NodeJS(Express)', 'MySQL'],
};
const Others = {
  title: 'Others',
  skills: ['Python', 'Java', 'English: свободное чтение и аудирование'],
};
const skillSets = [Frontend, Backend, Others];

export default function AboutMe(props: IAboutMe) {
  const { children } = props;

  return (
    <div className={classNames(styles.AboutMe, variables.colors)}>
      <h2 className={styles.title}>Богдан Севрук</h2>
      {skillSets.map((skillSetProp) => (
        <SkillSet key={skillSetProp.title} {...skillSetProp} />
      ))}
    </div>
  );
}
