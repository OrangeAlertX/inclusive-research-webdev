import { ReactNode } from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

interface IButton {
  children: ReactNode | ReactNode[] | (() => string);
  externalStyles?: string;
  // children: React.ReactElement | string | number | JSX.Element | (() => string);
  onClick: () => void;
}

Button.defaultProps = {};

export default function Button(props: IButton) {
  const { children, onClick, externalStyles } = props;

  return (
    <button
      className={classNames(styles.button, externalStyles)}
      onClick={onClick}
    >
      {typeof children === 'function' ? children() : children}
    </button>
  );
}
