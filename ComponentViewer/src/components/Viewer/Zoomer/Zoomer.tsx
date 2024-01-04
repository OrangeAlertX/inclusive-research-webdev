import { useEffect, useRef, useState } from 'react';
import styles from './Zoomer.module.css';

interface IZoomer {
  children: React.ReactElement;
  resolution: number;
}

export default function Zoomer(props: IZoomer) {
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
    outer.style.setProperty('width', resolution + 'px');
  }, [resolution]);

  return (
    <div ref={refContainer} className={styles.container}>
      <div ref={refOuter} className={styles.outer}>
        <div className={styles.middle}>
          <div ref={refInner} className={styles.inner}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
