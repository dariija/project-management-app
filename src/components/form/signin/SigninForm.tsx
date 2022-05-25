import styles from './SigninForm.module.css';
import { Link } from 'react-router-dom';
import Button, { ButtonStyle } from '../../button/Button';

type Props = {
  children: React.ReactNode[];
  onSubmit: () => void;
};

export default function SigninForm({ children, onSubmit }: Props) {
  return (
    <div className={styles.signin_form}>
      <h1 className={styles.form_title}>Sign in</h1>
      <form onSubmit={onSubmit}>
        {children}
        <Button type="submit" text="Sign in" style={ButtonStyle.submit_auth_form} />
      </form>
      <hr></hr>
      <Link to="/signup">Don&apos;t have account yet? Register</Link>
    </div>
  );
}
