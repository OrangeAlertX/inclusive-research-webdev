import { ReactNode } from 'react';
import styles from './Button.module.css';

interface IButton {
  children: ReactNode | ReactNode[];
  className?: string;
  onClick: () => void;
}

Button.defaultProps = {};

export default function Button(props: IButton) {
  const { children, onClick, className } = props;

  return (
    <button className={className ?? styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
