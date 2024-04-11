import styles from './Leetcode.module.css';
import { Viewer } from '../App/App';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../utils/Context';
import waitBySetInterval from '../../../../ComponentViewer/src/utils/asyncTools/waitBySetInterval';

interface ILeetcode {}

Leetcode.defaultProps = {};

export default function Leetcode(props: ILeetcode) {
  const {} = props;

  const [ref, setRef] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!ref) return;

    const iframe = ref.querySelector('iframe');

    let isActual = true;
    waitBySetInterval(() => iframe.contentDocument.documentElement, 50).then(
      (leetcodeTagHTML: HTMLElement) => {
        if (!isActual) return;
        leetcodeTagHTML.setAttribute('class', theme);
      }
    );

    return () => {
      isActual = false;
    };
  }, [theme]);

  return (
    <div className={styles.Leetcode}>
      <h2 className={styles.title}>Leetcode</h2>
      <h3 className={styles.profile}>
        <a
          href="https://leetcode.com/orangealertx/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          OrangeAlertX
        </a>
        <span className={styles.linkpopup}>(ссылка на профиль)</span>
      </h3>
      <div className={styles.container} ref={setRef}>
        <Viewer
          src={`/projects/leetcode`}
          min={800}
          max={800}
          withFullPage={false}
          withMobileView={false}
          heightAdjust={true}
          ViewerHeightDefault={368}
          externalStyles={classNames(styles.colors, styles.fromLeetcode)}
        ></Viewer>
      </div>
    </div>
  );
}
