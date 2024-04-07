import { useState } from 'react';
import styles from './Toggle.module.css';

interface IToggle {
  children: React.ReactElement | string | JSX.Element;
}

Toggle.defaultProps = {

}

export default function Toggle(props: IToggle) {
  const { children } = props;

  return (<div className={styles.Toggle}></div>);
}