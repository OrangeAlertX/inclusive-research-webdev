import { Children, useEffect, useState } from 'react';
import styles from './EmbedComponent.module.css';
import friendStyles from '../Zoomer.module.css';
import { createPortal } from 'react-dom';

const cssOrLink = (name, cssLink, updateCssLink) => {
  if (cssLink) return cssLink;

  const head = document.head;

  if (import.meta.env.DEV) {
    const styles = head.querySelectorAll('style[type="text/css"]');

    let styleOfIndex;
    let styleOfComponent;
    styles.forEach((style) => {
      const curStyle = style.getAttribute('data-vite-dev-id');
      if (curStyle.includes('index.css')) styleOfIndex = style;
      if (curStyle.includes(name)) {
        styleOfComponent = style;
      }
    });

    cssLink = styleOfIndex.innerHTML + ' ' + styleOfComponent.innerHTML;
    const observer = new MutationObserver((mutationsList) => {
      console.log(styleOfComponent.innerHTML);
      updateCssLink(styleOfIndex.innerHTML + ' ' + styleOfComponent.innerHTML);
    });
    observer.observe(styleOfComponent, { childList: true });
  } else {
  }

  return cssLink;
};

export default function EmbedComponent(props) {
  if (typeof window === 'undefined') {
    return null;
  }
  const { children, resolution } = props;

  const [ref, setRef] = useState(null);
  const [cssLink, updateCssLink] = useState('');

  useEffect(() => {
    const iframe = ref;
    iframe?.style.setProperty('width', resolution + 'px');

    iframe?.style.setProperty('transform', `scale(${900 / resolution})`);
  }, [resolution, ref]);

  const mountNode = ref?.contentDocument.body;
  const headStyle = (
    <>
      {import.meta.env.DEV && (
        <style>
          {cssOrLink(Children.only(children).type.name, cssLink, updateCssLink)}
        </style>
      )}
      {import.meta.env.PROD && (
        <link
          type="stylesheet"
          href={cssOrLink(
            Children.only(children).type.name,
            cssLink,
            updateCssLink
          )}
        ></link>
      )}
    </>
  );
  const bodyStyleAndChildren = (
    <>
      <style>{`body {flex: auto;
      display: flex;
      justify-content: center;}`}</style>
      {children}
    </>
  );
  return (
    <div className={friendStyles.container}>
      <div className={friendStyles.outer}>
        <iframe
          className={friendStyles.inner}
          style={{ width: 720 }}
          ref={setRef}
        >
          {mountNode && createPortal(bodyStyleAndChildren, mountNode, 'first')}
          {mountNode &&
            createPortal(headStyle, ref.contentDocument.head, 'second')}
        </iframe>
      </div>
    </div>
  );
}
