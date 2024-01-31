import styles from './Leetcode.module.css';
import variables from '../App/variables.module.css';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';

interface ILeetcode {
  // children: React.ReactElement | string | JSX.Element;
  Viewer: React.JSXElementConstructor<any>;
}

Leetcode.defaultProps = {};

export default function Leetcode(props: ILeetcode) {
  const { Viewer } = props;

  return (
    <div className={styles.Leetcode}>
      <h2 className={styles.title}>Leetcode</h2>
      <div className={styles.content}>
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
        <div className={styles.leetcode}>
          <style></style>
        </div>
        <div className={styles.container}>
          <Viewer
            src={`/projects/leetcode`}
            min={800}
            max={800}
            withRangeSlider={false}
            withFullPage={false}
            colors={variables.colors}
          ></Viewer>
        </div>
      </div>
    </div>
  );
}
