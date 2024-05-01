import styles from './Leetcode.module.css';
import { Viewer } from '../App/App';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../utils/Context';
import waitIframeDocument from '../../../../ComponentViewer/src/utils/asyncTools/waitIframeDocument';
import path from 'path-browserify';
import { leetcodeLink } from '../../data/links';

interface ILeetcode {}

Leetcode.defaultProps = {};

export default function Leetcode(props: ILeetcode) {
  const {} = props;

  const [ref, setRef] = useState(null);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    if (!ref) return;

    const iframe = ref.querySelector('iframe');

    let instance = { isActual: true };
    waitIframeDocument(iframe, instance, 200).then((iframeWindow: Document) => {
      if (!instance.isActual) return;
      iframeWindow.documentElement.setAttribute('class', theme);
    });
    return () => {
      instance.isActual = false;
    };
  }, [theme, ref]);

  return (
    <div className={styles.Leetcode}>
      <h2 className={styles.title}>Leetcode</h2>
      <h3 className={styles.profile}>
        <a
          href={leetcodeLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          data-link="ссылка на профиль"
        >
          OrangeAlertX
        </a>
      </h3>
      <div className={styles.container} ref={setRef}>
        <Viewer
          src={path.join(
            (import.meta.env?.BASE_URL || process?.env.BASE) ?? '',
            '/projects/leetcode'
          )}
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
