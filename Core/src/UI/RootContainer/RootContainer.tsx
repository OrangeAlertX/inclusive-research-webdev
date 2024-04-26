import styles from './RootContainer.module.css';
import classNames from 'classnames';
import variablesDefault from '../../components/App/variables.module.css';
import { ReactNode, useState } from 'react';

interface IRootContainer {
  children: ReactNode | ReactNode[];
  className?: string;
  rootStyles?: string;
}

export default function RootContainer(props: IRootContainer) {
  const { children, className, rootStyles } = props;

  return (
    <div
      className={classNames(
        className ?? Object.values(variablesDefault),
        styles.container
      )}
    >
      <div className={rootStyles ?? styles.root}>{children}</div>
    </div>
  );
}
