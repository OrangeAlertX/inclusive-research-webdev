import { useState } from 'react';
import styles from './FullPage.module.css';
import Button from '../../../UI/Button/Button';
import SvgFullPage from './SvgFullPage/SvgFullPage';

interface IFullPage {
  className: string;
}

export default function FullPage(props: IFullPage) {
  const { className } = props;

  return (
    <div className={className}>
      <Button onClick={() => {}}>
        <SvgFullPage className={styles.container} />
      </Button>
    </div>
  );
}
