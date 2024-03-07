import styles from './RootContainer.module.css';

interface IRootContainer {
  children: React.ReactElement;
}

export default function RootContainer(props: IRootContainer) {
  const { children } = props;

  return <div className={styles.root}>{children}</div>;
}
