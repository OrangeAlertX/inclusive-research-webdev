import styles from './RootContainer.module.css';
import classNames from 'classnames';
import variablesInlineDefault from '../../components/App/variables.module.css?inline';

interface IRootContainer {
  children: React.ReactElement;
  className?: string;
  variablesInline?: string;
}

const extractCss = (cssInline) =>
  `:root {${cssInline
    .split('\n')
    .filter((row) => row.includes('--'))
    .join(' ')}}`;

const cssRootVariablesDefault = extractCss(variablesInlineDefault);

export default function RootContainer(props: IRootContainer) {
  const { children, className, variablesInline } = props;
  const rootClassName = classNames(styles.root, className);
  if (variablesInline) var cssRootVariables = extractCss(variablesInline);

  const globalVariables = (
    <style>{cssRootVariables || cssRootVariablesDefault}</style>
  );

  return (
    <>
      {globalVariables}
      <div className={rootClassName}>{children}</div>
    </>
  );
}
