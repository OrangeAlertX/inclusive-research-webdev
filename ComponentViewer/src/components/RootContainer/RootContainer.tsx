import { useState } from 'react';
import styles from './RootContainer.module.css';

interface RootContainer {
  children: React.ReactElement;
}

export default function RootContainer(props: RootContainer) {
  const { children } = props;

  return <div className={styles.root}>{children}</div>;
}
