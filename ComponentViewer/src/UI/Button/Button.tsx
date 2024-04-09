import { ReactNode } from 'react';
import styles from './Button.module.css';

interface IButton {
  children: ReactNode | ReactNode[];
  onClick: () => void;
}

Button.defaultProps = {};

export default function Button(props: IButton) {
  const { children, onClick } = props;

  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
