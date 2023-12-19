import { Children, useEffect, useRef, useState } from 'react';
import styles from './EmbedComponent.module.css';
import routes from '../../../components/App/routes';
import friendStyles from '../Zoomer.module.css';
import { createPortal } from 'react-dom';

// type allowedChildren = (typeof routes)[number]['name'];

// interface EmbedComponent {
//   children: { name: allowedChildren };
// }

export default function EmbedComponent(props) {
  const { children, resolution } = props;

  const [ref, setRef] = useState(null);

  useEffect(() => {
    const iframe = ref;
    const document = iframe?.contentDocument;
    const viewport = document?.querySelector('meta[name="viewport"]');
    console.log(viewport);

    if (viewport)
      viewport.setAttribute(
        'content',
        `width=${resolution}, initial-scale=1.0`
      );
    else {
    }
  }, [resolution, ref]);

  const mountNode = ref?.contentDocument.body;
  return (
    <div className={friendStyles.container}>
      <iframe ref={setRef}>
        {mountNode && createPortal(children, mountNode)}
      </iframe>
    </div>
  );
}
