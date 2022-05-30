import { useTranslation } from 'react-i18next';
import LinkButton from '../../link/LinkButton';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.error_container}>
        <div className={styles.oops}>{t('oops')}</div>
        <div className={styles.text}>{t('error_404_page')}</div>
        <LinkButton path="/main" text={t('to_main')} />
      </div>
    </div>
  );
}
