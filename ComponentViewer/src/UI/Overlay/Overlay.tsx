import { ReactElement, useContext, useEffect, useState } from 'react';
import styles from './Overlay.module.css';
import classNames from 'classnames';
import { ThemeContext } from '../../../../Core/src/utils/Context';

interface IOverlay {
  children?: ReactElement | null;
  colorEffectClass?: string;
}

Overlay.defaultProps = {};

export default function Overlay(props: IOverlay) {
  const { children, colorEffectClass } = props;

  const [OverlayRef, setOverlayRef] = useState(null);
  const [isMobile, setIsMobile] = useContext(ThemeContext);

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
    isMobile && (
      <div
        className={classNames(colorEffectClass ?? styles.Overlay, {
          [styles.disable]: !isMobile,
        })}
        ref={setOverlayRef}
      >
        {children}
      </div>
    )
  );
}
