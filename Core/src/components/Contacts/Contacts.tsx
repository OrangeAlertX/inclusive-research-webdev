import styles from './Contacts.module.css';
import global from '../../global.module.css';
import { TbBrandLeetcode } from 'react-icons/tb';
import { CgMail } from 'react-icons/cg';
import classNames from 'classnames';
import { GiNightSleep } from 'react-icons/gi';
import { HiSun } from 'react-icons/hi';
import { CiMobile3 } from 'react-icons/ci';
import { IoIosDesktop } from 'react-icons/io';
import { MobileContext, ThemeContext } from '../../utils/Context';
import ToggleContext from '../../../../ComponentCollection/src/components/ToggleContext/ToggleContext';
import { FaGithub } from 'react-icons/fa';
import { leetcodeLink } from '../../data/links';

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
        <a target="_blank" href={leetcodeLink} title="leetcode">
          <TbBrandLeetcode size={'2em'} />
        </a>
        <h3 className={global.disable}>GitHub</h3>
        <a target="_blank" href={'https://github.com/OrangeAlertX'}>
          <FaGithub size={'2em'} />
        </a>
      </div>
      <ToggleContext {...ToggleContextPropsForMobileDesktop}>
        <CiMobile3 />
        <IoIosDesktop />
      </ToggleContext>
    </div>
  );
}
