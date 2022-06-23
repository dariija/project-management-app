import styles from './SigninForm.module.css';
import { Link } from 'react-router-dom';
import Button, { ButtonStyle } from '../../button/Button';
import { useTranslation } from 'react-i18next';

type Props = {
  children: React.ReactNode[];
  onSubmit: () => void;
};

export default function SigninForm({ children, onSubmit }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.signin_form}>
      <h1 className={styles.form_title}>{t('sign_in')}</h1>
      <form onSubmit={onSubmit}>
        {children}
        <Button type="submit" text={t('sign_in')} style={ButtonStyle.submit_auth_form} />
      </form>
      <hr></hr>
      <Link to="/signup">{t('no_account')}</Link>
    </div>
  );
}
