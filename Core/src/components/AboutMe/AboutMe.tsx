import { useState } from 'react';
import styles from './AboutMe.module.css';

interface IAboutMe {
  children: React.ReactElement | string | JSX.Element;
}

AboutMe.defaultProps = {};

export default function AboutMe(props: IAboutMe) {
  const { children } = props;

  return (
    <div className={styles.AboutMe}>
      <h2 className={styles.title}>Богдан Севрук</h2>
      <h6></h6>
    </div>
  );
}
