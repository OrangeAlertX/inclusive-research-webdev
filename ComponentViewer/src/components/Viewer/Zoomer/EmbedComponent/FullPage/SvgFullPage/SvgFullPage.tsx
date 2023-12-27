import { useState } from 'react';
import styles from './SvgFullPage.module.css';

interface ISvgFullPage {
  className: string;
}

export default function SvgFullPage(props: ISvgFullPage) {
  const { className } = props;

  return (
    <div className={className}>
      <svg
        className={styles.svg}
        width="100%"
        height="100%"
        version="1.1"
        viewBox="0 0 36 36"
      >
        <path
          fill="currentColor"
          d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"
        ></path>

        <path
          fill="currentColor"
          d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"
        ></path>

        <path
          fill="currentColor"
          d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"
        ></path>

        <path
          fill="currentColor"
          d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"
        ></path>
      </svg>
    </div>
  );
}
