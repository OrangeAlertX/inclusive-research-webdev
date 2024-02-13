import styles from './RootContainer.module.css';
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

export default function RootContainer(props: IRootContainer) {
  const { children, className, variablesInline } = props;
  const rootClassName = className ? className : styles.root;

  const cssRootVariables = variablesInline
    ? extractCss(variablesInline)
    : extractCss(variablesInlineDefault);

  const globalVariables = <style>{cssRootVariables}</style>;

  return (
    <>
      {globalVariables}
      <div className={rootClassName}>{children}</div>
    </>
  );
}
