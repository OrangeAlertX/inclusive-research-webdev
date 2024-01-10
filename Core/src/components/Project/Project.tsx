import { useState } from 'react';
import styles from './Project.module.css';

interface IProject {
  children: React.ReactElement | string | JSX.Element;
}

Project.defaultProps = {};

export default function Project(props: IProject) {
  const { children } = props;

  return (
    <div className={styles.Project}>
      <div className={styles.content}></div>
      {children}
    </div>
  );
}
