import styles from './MyProjects.module.css';
import Project from './Project/Project';
import { Viewer } from '../App/App';

interface IMyProjects {
  // children: React.ReactElement | string | JSX.Element;
}

MyProjects.defaultProps = {};

const projectStatic = {
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
};

const projectAdaptive = {
  title: 'Адаптивный лэндинг',
  newSkills: ['SCSS', 'Адаптивность'],
  about:
    'Сделан по учебному макету Figma для продвинутого изучения верстки и каскадных стилей.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Landing-Page-Responsive',
  src: `/projects/adaptive-landing`,
};

const projectColorGame = {
  title: 'Игра найди пару',
  newSkills: ['JavaScript', 'Организация кода'],
  about:
    'Есть несколько уровней сложности, рейтинг. Лучше выглядит на смартфоне.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Paired-Colors',
  src: `/projects/colors-game`,
  viewerProps: {
    min: 820,
  },
};

const projectTemplates = {
  title: 'Шаблоны проектов',
  newSkills: ['Webpack', 'Vite', 'NPM', 'SSR'],
  about:
    'Создание React-шаблонов на Webpack и Vite с Server-Side Rendering, с возможностью установки через NPM',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/ReactTemplates',
};

const projectViewer = {
  title: 'Выставка компонентов',
  newSkills: ['React', 'TypeScript'],
  about:
    'То самое embedded окно, в которых отображаются мои проекты. С возможностью масштабирования и полного экрана.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/ComponentViewer',
};

const projectResume = {
  title: 'Ядро',
  newSkills: ['Express', 'Module CSS'],
  about:
    'Текущая страница. Объединяет все мои проекты в одно резюме. Есть версия для телефона.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Core',
};

const projectLeetcode = {
  title: 'Cкрейпинг Leetcode',
  newSkills: ['Парсинг', 'Virtual DOM'],
  about:
    'Этот небольшой компонент содержит множество скрытых сложностей, поэтому выделен в отдельных проект.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/Core/server/leetcodeParser.js',
};

const projectCollection = {
  title: 'Коллекция компонентов',
  newSkills: ['UI/UX Паттерны'],
  about:
    'Коллекция React-компонентов для быстрого создания основных фронтенд-решений.',
  code: 'https://github.com/OrangeAlertX/inclusive-research-webdev/tree/main/ComponentCollection',
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
];

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
