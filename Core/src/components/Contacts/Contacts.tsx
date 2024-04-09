import styles from './Contacts.module.css';
import global from '../../global.module.css';
import GitHubLink from '../MyProjects/Project/GitHubLink';
import { TbBrandLeetcode } from 'react-icons/tb';
import { CgMail } from 'react-icons/cg';
import LightDarkToggle from '../../../../ComponentCollection/src/components/LightDarkToggle/LightDarkToggle';

interface IContacts {
  // children: React.ReactElement | string | JSX.Element;
}

Contacts.defaultProps = {};

export default function Contacts(props: IContacts) {
  const {} = props;

  return (
    <div className={styles.Contacts}>
      <LightDarkToggle />
      <div className={styles.contacts}>
        <h3 className={global.disable}>Почта</h3>
        <a href="mailto:orangealertx@gmail.com" title="orangealertx@gmail.com">
          <CgMail size={'2em'} />
        </a>
        <h3 className={global.disable}>Leetcode</h3>
        <a href="https://leetcode.com/orangealertx/">
          <TbBrandLeetcode size={'2em'} />
        </a>
        <h3 className={global.disable}>GitHub</h3>
        <GitHubLink href={'https://github.com/OrangeAlertX'} />
      </div>
    </div>
  );
}
