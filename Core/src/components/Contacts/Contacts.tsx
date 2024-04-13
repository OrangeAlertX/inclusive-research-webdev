import styles from './Contacts.module.css';
import global from '../../global.module.css';
import GitHubLink from '../MyProjects/Project/GitHubLink';
import { TbBrandLeetcode } from 'react-icons/tb';
import { CgMail } from 'react-icons/cg';
import classNames from 'classnames';
import Switch from '../../../../ComponentCollection/src/UI/Switch/Switch';
import { GiNightSleep } from 'react-icons/gi';
import { HiSun } from 'react-icons/hi';
import ToggleContext from '../../../components/ToggleContext/ToggleContext';
import { ThemeContext } from '../../utils/Context';

interface IContacts {}

Contacts.defaultProps = {};

export default function Contacts(props: IContacts) {
  const {} = props;

  const ToggleContextPropsForTheme = {
    className: classNames(styles.theme, global.extendButton),
    Context: ThemeContext,
    activeState: 'light',
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
      <Switch
        className={classNames(styles.mobileTheme, global.extendButton)}
        state={false}
        toggleOnClick={() => {}}
      ></Switch>
    </div>
  );
}
