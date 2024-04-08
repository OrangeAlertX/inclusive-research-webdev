import styles from './RootContainer.module.css';
import classNames from 'classnames';
import variablesDefault from '../../components/App/variables.module.css';
import { useState } from 'react';

interface IRootContainer {
  children: React.ReactElement;
  className?: string;
  variablesInline?: string;
}

export default function RootContainer(props: IRootContainer) {
  const { children, className, variablesInline } = props;

  const [light, setLight] = useState(false);

  return (
    <div
      className={classNames(
        className ?? Object.values(variablesDefault),
        styles.container
      )}
    >
      <div className={styles.root}>{children}</div>
    </div>
  );
}
