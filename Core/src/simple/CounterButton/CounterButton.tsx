import { useState } from 'react';
import styles from './CounterButton.module.css';
import Button from '../../UI/Button/Button';

interface ICounterButton {
  children?: React.ReactElement;
}

export default function CounterButton(props: ICounterButton) {
  const { children } = props;

  const [count, setCount] = useState(0);

  return (
    <div className={styles.card}>
      <Button onClick={() => setCount(count + 1)}>
        {() => `Count is ${count}!`}
      </Button>
    </div>
  );
}
