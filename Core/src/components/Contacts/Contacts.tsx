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
      <div className={styles.mail}>
        <h3>Почта</h3>
        <a href="mailto:orangealertx@gmail.com">orangealertx@gmail.com</a>
      </div>
    </div>
  );
}
