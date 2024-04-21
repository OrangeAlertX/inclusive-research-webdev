import styles from './MyProjects.module.css';
import Project, { ProjectData } from './Project/Project';
import { Viewer } from '../App/App';
import { ReactComponent as StaticDetails } from '../../../../Landing-Page-Static/README.md';
import { ReactComponent as ResponsiveDetails } from '../../../../Landing-Page-Responsive/README.md';
import { ReactComponent as ColorGameDetails } from '../../../../Paired-Colors/README.md';
import { ReactComponent as TemplatesDetails } from '../../../../ReactTemplates/README.md';
import { ReactComponent as ViewerDetails } from '../../../../ComponentViewer/README.md';
import { ReactComponent as CoreDetails } from '../../../README.md';
import { ReactComponent as LeetcodeDetails } from '../../../../Leetcode-Parser/README.md';
import { ReactComponent as CollectionDetails } from '../../../../ComponentCollection/README.md';
import { ReactComponent as DeployDetails } from '../../../../README.md';
import { useEffect, useState } from 'react';
import Button from '../../../../ComponentCollection/src/UI/Button/Button';

interface IMyProjects {
  // children: ReactNode | ReactNode[];
}

MyProjects.defaultProps = {};

const projectStatic: ProjectData = {
  title: 'Cтатичный лэндинг',
  newSkills: ['CSS', 'HTML'],
  about:
    'Сделан по учебному макету Figma, который включает в себя все основы верстки и каскадных стилей. Единственный статичный проект.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Landing-Page-Static',
  src: `/projects/static-landing`,
  viewerProps: {
    min: 1360,
    max: 1360,
  },
  details: StaticDetails,
};

const projectAdaptive: ProjectData = {
  title: 'Адаптивный лэндинг',
  newSkills: ['SCSS', 'Адаптивность'],
  about:
    'Сделан по учебному макету Figma для продвинутого изучения верстки и каскадных стилей.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Landing-Page-Responsive',
  src: `/projects/adaptive-landing`,
  details: ResponsiveDetails,
};

function ColorGameDetailsWithCheat() {
  const ResetButton = localStorage.getItem('curDiffAvailable') != '1';
  const style: React.CSSProperties = { marginLeft: 'auto', display: 'block' };

  console.log(localStorage.getItem('curDiffAvailable'));

  return (
    <>
      <Button
        onClick={() => localStorage.setItem('curDiffAvailable', '8')}
        style={style}
      >
        Cheat Difficulties
      </Button>
      {ResetButton && (
        <Button
          onClick={() => localStorage.setItem('curDiffAvailable', '1')}
          style={style}
        >
          Reset Progress
        </Button>
      )}
      <ColorGameDetails />
    </>
  );
}
const projectColorGame: ProjectData = {
  title: 'Игра найди пару',
  newSkills: ['JavaScript', 'Организация кода'],
  about:
    'Адаптивная игра "найди пару" с несколькими уровнями сложности на чистом JS.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Paired-Colors',
  src: `/projects/colors-game`,
  details: ColorGameDetailsWithCheat,
};

const projectTemplates: ProjectData = {
  title: 'Шаблоны проектов',
  newSkills: ['Webpack', 'Vite', 'NPM', 'SSR'],
  about:
    'Создание React-шаблонов на Webpack и Vite с Server-Side Rendering, с возможностью установки через NPM',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/ReactTemplates',
  details: TemplatesDetails,
};

const projectViewer: ProjectData = {
  title: 'Выставка компонентов',
  newSkills: ['React', 'TypeScript'],
  about:
    'Embedded окно, в которых отображаются мои проекты. С возможностью масштабирования и полного экрана.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/ComponentViewer',
  details: ViewerDetails,
};

const projectResume: ProjectData = {
  title: 'Ядро',
  newSkills: ['Express', 'Module CSS'],
  about:
    'Текущая страница. Объединяет все мои проекты в одно резюме. Есть версия для телефона.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Core',
  details: CoreDetails,
};

const projectLeetcode: ProjectData = {
  title: 'Cкрейпинг Leetcode',
  newSkills: ['Парсинг', 'Virtual DOM'],
  about:
    'Этот небольшой компонент содержит множество скрытых сложностей, поэтому выделен в отдельных проект.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Core/server/leetcodeParser.js',
  details: LeetcodeDetails,
};

const projectCollection: ProjectData = {
  title: 'Коллекция компонентов',
  newSkills: ['UI/UX Паттерны'],
  about:
    'Коллекция React-компонентов для быстрого создания основных фронтенд-решений.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/ComponentCollection',
  src: '/collection',
  details: CollectionDetails,
};

const projectDeploy: ProjectData = {
  title: 'DevOps',
  newSkills: ['Docker', 'NGINX', 'Микросервисы'],
  about: 'Знакомство с девопс технологиями. Девелопмент и продакшн кластер.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/.nginx',
  details: DeployDetails,
};

const projects = [
  projectStatic,
  projectAdaptive,
  projectColorGame,
  projectTemplates,
  projectViewer,
  projectResume,
  projectLeetcode,
  projectCollection,
  projectDeploy,
];

export default function MyProjects(props: IMyProjects) {
  const {} = props;

  const ProjectWithViewer = (project) => {
    return <Project {...project} Viewer={Viewer} />;
  };

  const [MyProjectsRef, setMyProjectsRef] = useState(null);
  useEffect(() => {
    if (!MyProjectsRef) return;

    const game = MyProjectsRef.querySelector(
      `iframe[src*='${projectColorGame.src}']`
    );
  }, [MyProjectsRef]);

  return (
    <div className={styles.MyProjects} ref={setMyProjectsRef}>
      <h2 className={styles.title}>Проекты</h2>
      {projects.map((project) => {
        return <ProjectWithViewer key={project.title} project={project} />;
      })}
    </div>
  );
}
