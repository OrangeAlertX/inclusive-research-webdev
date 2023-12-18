import { useEffect, useRef, useState } from 'react';
import styles from './Zoomer.module.css';

interface Zoomer {
  children: React.ReactElement;
  resolution: number;
}

export default function Zoomer(props) {
  const refContainer = useRef(null);
  const refOuter = useRef(null);
  const refInner = useRef(null);

  const { children, resolution } = props;

  useEffect(() => {
    const container = refContainer.current;
    const containerWidth = container.offsetWidth;

    const outer = refOuter.current;
    outer.style.setProperty(
      'transform',
      `scale(${containerWidth / resolution})`
    );

    const inner = refInner.current;
    inner.style.setProperty('width', resolution + 'px');
  }, [resolution]);

  return (
    <div ref={refContainer} className={styles.container}>
      <div ref={refOuter} className={styles.outer}>
        <div ref={refInner} className={styles.inner}>
          {children}
        </div>
      </div>
    </div>
  );
}
