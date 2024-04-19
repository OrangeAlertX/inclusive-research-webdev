import { ReactNode, useEffect, useState } from 'react';
import styles from './Popup.module.css';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

interface IPopup {
  children: ReactNode | ReactNode[];
  active: boolean;
  toggleActive: () => void;
  className?: string;
}

Popup.defaultProps = {};

export default function Popup(props: IPopup) {
  const { children, active, toggleActive, className } = props;

  const [PopupRef, setPopupRef] = useState(null);
  useEffect(() => {
    if (!PopupRef) return;
    const cb = (event) => {
      if (event.target !== PopupRef) return;
      toggleActive();
    };
    PopupRef.addEventListener('click', cb);

    return () => {
      PopupRef.removeEventListener('click', cb);
    };
  }, [PopupRef]);

  const PopupComponent = active ? (
    <div className={classNames(className, styles.Popup)} ref={setPopupRef}>
      <div className={styles.content}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  ) : null;

  return createPortal(PopupComponent, document.body, 'Popup');
}
