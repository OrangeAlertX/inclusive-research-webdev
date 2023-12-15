import { useState } from 'react';
import styles from './Zoomer.module.css';

interface Zoomer {
  children: React.ReactElement;
}

export default function Zoomer(props) {
  const { children } = props;

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
