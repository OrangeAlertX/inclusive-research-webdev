import { ReactNode } from 'react';

import styles from './Toggle.module.css';
import Button from '../Button/Button';
import classNames from 'classnames';

interface IToggle {
  children: ReactNode | ReactNode[];
  className?: string;
  toggleState: () => void;
  state: boolean;
}

Toggle.defaultProps = {};

export default function Toggle(props: IToggle) {
  const { children, className, toggleState, state } = props;

  return (
    <Button
      className={classNames(styles.Toggle, className)}
      onClick={toggleState}
    >
      {children}
    </Button>
  );
}
