import { useState } from 'react';
import styles from './RootContainer.module.css';
import classNames from 'classnames';

interface IRootContainer {
  children: React.ReactElement;
  className?: string;
}

export default function RootContainer(props: IRootContainer) {
  const { children, className } = props;
  const rootClassName = classNames(styles.root, className);

  return <div className={rootClassName}>{children}</div>;
}
