import styles from './Contacts.module.css';
import global from '../../global.module.css';
import GitHubLink from '../MyProjects/Project/GitHubLink';
import { TbBrandLeetcode } from 'react-icons/tb';
import { CgMail } from 'react-icons/cg';
import classNames from 'classnames';
import { GiNightSleep } from 'react-icons/gi';
import { HiSun } from 'react-icons/hi';
import { MobileContext, ThemeContext } from '../../utils/Context';
import ToggleContext from '../../../../ComponentCollection/src/components/ToggleContext/ToggleContext';

interface IContacts {}

Contacts.defaultProps = {};

export default function Contacts(props: IContacts) {
  const {} = props;

  const ToggleContextPropsForTheme = {
    className: classNames(styles.theme, global.extendButton),
    Context: ThemeContext,
    activeState: 'light',
  };

  const ToggleContextPropsForMobileDesktop = {
    className: classNames(styles.theme, global.extendButton),
    Context: MobileContext,
    activeState: 'mobile',
    iconPosition: 'left' as 'left' | 'right',
  };

  return (
    <div className={styles.Contacts}>
      <ToggleContext {...ToggleContextPropsForTheme}>
        <HiSun />
        <GiNightSleep />
      </ToggleContext>
      <div className={styles.contacts}>
        <h3 className={global.disable}>Почта</h3>
        <a href="mailto:orangealertx@gmail.com" title="orangealertx@gmail.com">
          <CgMail size={'2em'} />
        </a>
        <h3 className={global.disable}>Leetcode</h3>
        <a href="https://leetcode.com/orangealertx/" title="leetcode">
          <TbBrandLeetcode size={'2em'} />
        </a>
        <h3 className={global.disable}>GitHub</h3>
        <GitHubLink href={'https://github.com/OrangeAlertX'} />
      </div>
      <ToggleContext {...ToggleContextPropsForMobileDesktop}></ToggleContext>
    </div>
  );
}
