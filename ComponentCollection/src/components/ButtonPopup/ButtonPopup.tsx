import { ReactNode, useState } from 'react';
import styles from './ButtonPopup.module.css';
import Popup from '../../UI/Popup/Popup';
import Button from '../../UI/Button/Button';

interface IButtonPopup {
  children: ReactNode | ReactNode[];
  buttonContent: ReactNode | ReactNode[];
}

ButtonPopup.defaultProps = {};

export default function ButtonPopup(props: IButtonPopup) {
  const { children, buttonContent } = props;

  const [active, setActive] = useState(false);
  const toggleActive = () => setActive((prev) => !prev);

  return (
    <>
      <Button onClick={toggleActive}>{buttonContent}</Button>
      <Popup active={active} toggleActive={toggleActive}>
        {children}
      </Popup>
    </>
  );
}
