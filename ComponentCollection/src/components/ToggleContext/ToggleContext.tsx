import { ReactNode, useContext } from 'react';
import Switch from '../../UI/Switch/Switch';

interface IToggleContext {
  /**
   * One const, or two toggled childrens between states true and false
   */
  children?: ReactNode | ReactNode[];
  className?: string;
  Context: React.Context<[string, () => void]>;
  activeState: string;
  iconPosition?: 'left' | 'right';
}

ToggleContext.defaultProps = {
  iconPosition: 'right',
};

export default function ToggleContext(props: IToggleContext) {
  const { children, className, Context, activeState, iconPosition } = props;

  const [theme, toggleTheme] = useContext(Context);

  const ToggleProps = {
    toggleOnClick: toggleTheme,
    state: theme === activeState,
    className: className,
    iconPosition,
  };

  let label = null;
  if (Array.isArray(children)) {
    label = theme === activeState ? children[0] : children[1];
  } else if (children) {
    label = children;
  }

  return <Switch {...ToggleProps}>{label}</Switch>;
}
