import { useState } from 'react';
import styles from './CounterButton.module.css';

interface CounterButton {
  children?: React.ReactElement;
}

export default function CounterButton(props: CounterButton) {
  const { children } = props;

  const [count, setCount] = useState(0);

  return (
    <div className={styles.card}>
      <button onClick={() => setCount((count) => count + 1)}>
        Count is {count}!
      </button>
    </div>
  );
}
