import Button from '../../../../../../ComponentCollection/src/UI/Button/Button';
import styles from './FullPage.module.css';
import SvgFullPage from './SvgFullPage/SvgFullPage';

interface IFullPage {
  className: string;
  onClick: () => void;
}

export default function FullPage(props: IFullPage) {
  const { className, onClick } = props;

  return (
    <div className={className}>
      <Button onClick={onClick}>
        <SvgFullPage className={styles.svgContainer} />
      </Button>
    </div>
  );
}
