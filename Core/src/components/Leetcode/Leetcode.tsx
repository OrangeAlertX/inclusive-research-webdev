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

  const ref = useRef(null);

  useEffect(() => {
    let iframe = ref.current?.querySelector('iframe');

    const setStyles = () => {
      const style = {
        outline: '10px solid #282828',
        outlineOffset: '-10px',
      };

      iframe.style = style;
    };

    if (!iframe) {
      const interval = setInterval(() => {
        iframe = ref.current.querySelector('iframe');
        if (iframe) clearInterval(interval);
        setStyles();
      }, 2000);
    } else setStyles();
  }, []);

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
      <div ref={ref} className={styles.container}>
        <Viewer
          src={`/projects/leetcode`}
          min={800}
          max={800}
          withRangeSlider={false}
          withFullPage={false}
          heightAdjust={true}
          ViewerHeightDefault={368}
          colors={styles.colors}
        ></Viewer>
      </div>
    </div>
  );
}
