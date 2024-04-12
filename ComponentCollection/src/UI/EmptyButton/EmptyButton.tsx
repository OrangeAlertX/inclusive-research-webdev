import { ReactNode } from 'react';
import styles from './EmptyButton.module.css';

interface IEmptyButton {
  children: ReactNode | ReactNode[];
  className?: string;
  onClick: () => void;
}

EmptyButton.defaultProps = {};

export default function EmptyButton(props: IEmptyButton) {
  const { children, onClick, className } = props;

  return (
    <button className={className ?? styles.EmptyButton} onClick={onClick}>
      {children}
    </button>
  );
}
