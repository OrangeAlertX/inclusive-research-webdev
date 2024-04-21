import { ReactNode } from 'react';
import styles from './Button.module.css';

interface IButton {
  children: ReactNode | ReactNode[];
  style?: React.CSSProperties;
  className?: string;
  onClick: () => void;
}

Button.defaultProps = {};

export default function Button(props: IButton) {
  const { children, onClick, className, style } = props;

  return (
    <button
      style={style}
      className={className ?? styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
