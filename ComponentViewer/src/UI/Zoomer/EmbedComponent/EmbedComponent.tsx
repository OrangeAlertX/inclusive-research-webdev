import { Children, useEffect, useState } from 'react';
import styles from './EmbedComponent.module.css';
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

  let containerHeight;
  useEffect(() => {
    const iframe = ref;

    if (!iframe) return;

    const outer = iframe.parentElement;
    const containerWidth = outer.parentElement.offsetWidth;
    containerHeight = outer.parentElement.offsetHeight;

    outer.style.setProperty('width', resolution + 'px');
    const multiplier = containerWidth / resolution;
    const adjustHeight =
      containerHeight / 2 - (outer.offsetHeight * multiplier) / 2;
    outer.style.setProperty(
      'transform',
      `scale(${containerWidth / resolution}) translateY(${
        -adjustHeight / multiplier
      }px)`
    );
    iframe.style.setProperty(
      'height',
      (resolution / containerWidth) * outer.offsetHeight + 'px'
    );

    iframe.contentDocument.body.style = `
    display: flex;
    justify-content: center;
    align-items: center;
    `;

    // iframe.contentDocument
    //   .getElementById('iframeRoot')
    //   .style.setProperty('min-height', containerHeight / multiplier);
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
    <div id="iframeRoot" style={{ margin: '0 auto' }}>
      {children}
    </div>
  );
  return (
    <div className={styles.container}>
      <div className={styles.outer}>
        <iframe className={styles.inner} ref={setRef}>
          {mountNode && createPortal(bodyStyleAndChildren, mountNode, 'first')}
          {mountNode &&
            createPortal(headStyle, ref.contentDocument.head, 'second')}
        </iframe>
      </div>
    </div>
  );
}
