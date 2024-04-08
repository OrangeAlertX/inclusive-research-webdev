import styles from './LightDarkToggle.module.css';
import { GiNightSleep } from 'react-icons/gi';
import { HiSun } from 'react-icons/hi';
import { ReactNode, useEffect, useState } from 'react';
import Toggle from '../../UI/Toggle/Toggle';

interface IDayNightToggle {
  children?: ReactNode | ReactNode[];
}

DayNightToggle.defaultProps = {};

export default function DayNightToggle(props: IDayNightToggle) {
  const {} = props;

  const [isDay, setIsDay] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') setIsDay(true);
  }, []);

  useEffect(() => {
    const curDocumentTheme =
      document.documentElement.getAttribute('data-theme');

    if (isDay && curDocumentTheme !== 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    if (!isDay && curDocumentTheme !== 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    localStorage.setItem('theme', isDay ? 'light' : 'dark');
  }, [isDay]);

  const ToggleProps = {
    toggleState: () => setIsDay((isDay) => !isDay),
    state: isDay,
    className: styles.DayNightToggle,
  };

  return (
    <Toggle {...ToggleProps}>{isDay ? <HiSun /> : <GiNightSleep />}</Toggle>
  );
}
