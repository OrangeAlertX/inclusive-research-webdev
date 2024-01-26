import styles from './Leetcode.module.css';
import variables from '../App/variables.module.css';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';

interface ILeetcode {
  // children: React.ReactElement | string | JSX.Element;
  Viewer: React.JSXElementConstructor<any>;
}

Leetcode.defaultProps = {};

const leetcodeNodes = fetch('http://localhost:5173/projects/leetcode').then(
  (res) => res.text()
);

export default function Leetcode(props: ILeetcode) {
  const { Viewer } = props;

  const leetcodeRef = useRef(null);

  useEffect(() => {
    leetcodeNodes.then((json) => {
      const data = JSON.parse(json);
      const styles = data.styles;
      const solvedProblems = data.solvedProblems;
      const activites = data.activites;

      const leetcode = leetcodeRef.current;

      leetcode.firstChild.innerHTML = styles;
      leetcode.innerHTML += solvedProblems + activites;
    });
  }, []);

  const ViewerProps = {
    src: 'https://leetcode.com/orangealertx/',
    withRangeSlider: false,
    withFullPage: false,
    min: 1360,
    max: 1360,
    colors: classNames(variables.colors, styles.Viewer),
  };

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
        <div className={styles.leetcode} ref={leetcodeRef}>
          <style></style>
        </div>
        {/* <div className={styles.container}>
          <div className={styles.window}>
            <Viewer {...ViewerProps}></Viewer>
          </div>
        </div> */}
      </div>
    </div>
  );
}
