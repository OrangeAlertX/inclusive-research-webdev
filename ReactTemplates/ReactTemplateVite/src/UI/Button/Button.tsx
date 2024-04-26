import styles from './Button.module.css';
import {ReactElement} from "react";

interface IButton {
  children: ReactElement | string | number | (() => string);
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
