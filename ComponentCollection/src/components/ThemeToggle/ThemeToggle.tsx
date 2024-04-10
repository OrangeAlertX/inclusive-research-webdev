import styles from './ThemeToggle.module.css';
import { GiNightSleep } from 'react-icons/gi';
import { HiSun } from 'react-icons/hi';
import { ReactNode, useContext } from 'react';
import Toggle from '../../UI/Toggle/Toggle';
import { ThemeContext } from '../../../../Core/src/utils/Context';

interface IThemeToggle {
  children?: ReactNode | ReactNode[];
}

ThemeToggle.defaultProps = {};

export default function ThemeToggle(props: IThemeToggle) {
  const {} = props;

  const { theme, toggleTheme } = useContext(ThemeContext);

  const ToggleProps = {
    toggleState: toggleTheme,
    state: theme === 'light',
    className: styles.ThemeToggle,
  };

  return (
    <Toggle {...ToggleProps}>
      {theme === 'light' ? <HiSun /> : <GiNightSleep />}
    </Toggle>
  );
}
