import { ReactNode } from 'react';
import styles from './ToggleButton.module.css';
import classNames from 'classnames';
import Button from '../Button/Button';

interface IToggleButton {
  children: ReactNode | ReactNode[];
  className?: string;
  state: boolean;
  toggleOnClick: () => void;
}

ToggleButton.defaultProps = {};

export default function ToggleButton(props: IToggleButton) {
  const { state, toggleOnClick, children, className } = props;

  return (
    <Button
      onClick={toggleOnClick}
      className={classNames(styles.ToggleButton, className, {
        [styles.active]: state,
      })}
    >
      {children}
    </Button>
  );
}
