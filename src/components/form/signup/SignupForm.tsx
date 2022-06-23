import styles from './SignupForm.module.css';
import { Link } from 'react-router-dom';
import Button, { ButtonStyle } from '../../button/Button';
import { useTranslation } from 'react-i18next';

type Props = {
  children: React.ReactNode[];
  onSubmit: () => void;
};

export default function SignupForm({ children, onSubmit }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.signup_form}>
      <h1 className={styles.form_title}>{t('sign_up')}</h1>
      <form onSubmit={onSubmit}>
        {children}
        <Button type="submit" text={t('to_sign_up')} style={ButtonStyle.submit_auth_form} />
      </form>
      <hr></hr>
      <Link to="/signin">{t('have_account')}</Link>
    </div>
  );
}
