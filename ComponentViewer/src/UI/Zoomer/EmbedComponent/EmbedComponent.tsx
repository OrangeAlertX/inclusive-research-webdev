import { useState } from 'react';
import styles from './EmbedComponent.module.css';
import routes from '../../../components/App/routes';

// type allowedChildren = (typeof routes)[number]['name'];

// interface EmbedComponent {
//   children: { name: allowedChildren };
// }

export default function EmbedComponent(props) {
  const { children, resolution } = props;

  return <div></div>;
}
