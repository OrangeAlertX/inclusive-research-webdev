import styles from './ThemeToggle.module.css';
import { GiNightSleep } from 'react-icons/gi';
import { HiSun } from 'react-icons/hi';
import { ReactNode, useContext } from 'react';
import Switch from '../../UI/Switch/Switch';
import { ThemeContext } from '../../../../Core/src/utils/Context';

interface IThemeToggle {
  children?: ReactNode | ReactNode[];
  className?: string;
}

ThemeToggle.defaultProps = {};

export default function ThemeToggle(props: IThemeToggle) {
  const { className } = props;

  const { theme, toggleTheme } = useContext(ThemeContext);

  const ToggleProps = {
    toggleOnClick: toggleTheme,
    state: theme === 'light',
    className: className ?? styles.ThemeToggle,
  };

  return (
    <Switch {...ToggleProps}>
      {theme === 'light' ? <HiSun /> : <GiNightSleep />}
    </Switch>
  );
}
