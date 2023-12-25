import { useState } from 'react';
import styles from './Button.module.css';

interface IButton {
  children: React.ReactElement | string | number | JSX.Element | (() => string);
  onClick: () => void;
}

Button.defaultProps = {};

export default function Button(props: IButton) {
  const { children, onClick } = props;

  return (
    <button className={styles.button} onClick={onClick}>
      {typeof children === 'function' ? children() : children}
    </button>
  );
}
