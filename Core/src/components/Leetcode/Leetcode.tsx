import styles from './Leetcode.module.css';
import { useEffect, useRef } from 'react';
import { Viewer } from '../App/App';
import classNames from 'classnames';

interface ILeetcode {}

Leetcode.defaultProps = {};

export default function Leetcode(props: ILeetcode) {
  const {} = props;

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
      <div className={styles.container}>
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
