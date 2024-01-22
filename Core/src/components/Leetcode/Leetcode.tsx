import styles from './Leetcode.module.css';
import variables from '../App/variables.module.css';
import { useEffect } from 'react';

interface ILeetcode {
  // children: React.ReactElement | string | JSX.Element;
  Viewer: React.JSXElementConstructor<any>;
}

Leetcode.defaultProps = {};

export default function Leetcode(props: ILeetcode) {
  const { Viewer } = props;

  useEffect(() => {}, []);

  const ViewerProps = {
    src: 'https://leetcode.com/orangealertx/',
    withRangeSlider: false,
    withFullPage: false,
    min: 1360,
    max: 1360,
    colors: variables.colors,
  };

  return (
    <div className={styles.Leetcode}>
      <h2 className={styles.title}>Leetcode</h2>
      <div className={styles.content}>
        <h3>
          <a
            href="https://leetcode.com/orangealertx/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            OrangeAlertX
          </a>
          <span className={styles.linkpopup}> (ссылка на профиль)</span>
        </h3>
        <Viewer {...ViewerProps}></Viewer>
      </div>
    </div>
  );
}
