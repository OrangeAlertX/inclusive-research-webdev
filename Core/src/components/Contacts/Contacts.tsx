import { useState } from 'react';
import styles from './Contacts.module.css';

interface IContacts {
  // children: React.ReactElement | string | JSX.Element;
}

Contacts.defaultProps = {};

export default function Contacts(props: IContacts) {
  const {} = props;

  return (
    <div className={styles.Contacts}>
      <h2>Контакты</h2>
      <div className={styles.contact}>
        <h3>Почта</h3>
        <a href="mailto:orangealertx@gmail.com">orangealertx@gmail.com</a>
      </div>
      <div className={styles.contact}>
        <h3>GitHub</h3>
        <a href="https://github.com/OrangeAlertX">github.com/OrangeAlertX</a>
      </div>
      <div className={styles.contact}>
        <h3>Leetcode</h3>
        <a href="https://leetcode.com/orangealertx/">
          leetcode.com/orangealertx
        </a>
      </div>
    </div>
  );
}
