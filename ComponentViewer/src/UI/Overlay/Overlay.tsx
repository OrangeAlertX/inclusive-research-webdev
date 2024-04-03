import { ReactElement, useEffect, useState } from 'react';
import styles from './Overlay.module.css';
import classNames from 'classnames';

interface IOverlay {
  children?: ReactElement | null;
  colorEffectClass?: string;
}

Overlay.defaultProps = {};

export default function Overlay(props: IOverlay) {
  const { children, colorEffectClass } = props;

  const [OverlayRef, setOverlayRef] = useState(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        !mobile && setMobile(true);
      } else {
        mobile && setMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!OverlayRef) return;

    const cb = (e) => {
      e.preventDefault();
    };
    OverlayRef.addEventListener('click', cb);

    return () => {
      OverlayRef.removeEventListener('click', cb);
    };
  }, [OverlayRef]);

  return (
    mobile && (
      <div
        className={classNames(styles.Overlay, colorEffectClass, {
          [styles.disable]: !mobile,
        })}
        ref={setOverlayRef}
      >
        {children}
      </div>
    )
  );
}
