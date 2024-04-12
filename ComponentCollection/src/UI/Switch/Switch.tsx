import { ReactNode } from 'react';

import styles from './Switch.module.css';
import classNames from 'classnames';
import ToggleButton from '../ToggleButton/ToggleButton';

interface ISwitch {
  children: ReactNode | ReactNode[];
  className?: string;
  toggleOnClick: () => void;
  state: boolean;
}

Switch.defaultProps = {};

export default function Switch(props: ISwitch) {
  const { children, className, toggleOnClick, state } = props;

  return (
    <ToggleButton
      className={classNames(styles.Switch, className, {
        [styles.active]: state,
      })}
      toggleOnClick={toggleOnClick}
      state={state}
    >
      <div className={styles.sliderContainer}>
        <div className={styles.axis}></div>
        <div className={styles.slider}></div>
      </div>
      {children}
    </ToggleButton>
  );
}
