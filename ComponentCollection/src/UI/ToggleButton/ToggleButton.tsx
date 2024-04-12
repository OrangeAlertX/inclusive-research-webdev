import { ReactNode } from 'react';
import styles from './ToggleButton.module.css';
import classNames from 'classnames';
import EmptyButton from '../EmptyButton/EmptyButton';

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
    <EmptyButton
      onClick={toggleOnClick}
      className={classNames(className ?? styles.ToggleButton, {
        [styles.active]: state,
      })}
    >
      {children}
    </EmptyButton>
  );
}
