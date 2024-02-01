import { useState } from 'react';
import styles from './Contacts.module.css';

interface IContacts {
  children: React.ReactElement | string | JSX.Element;
}

Contacts.defaultProps = {

}

export default function Contacts(props: IContacts) {
  const { children } = props;

  return (<div className={styles.Contacts}></div>);
}