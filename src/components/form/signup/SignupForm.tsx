import styles from './SignupForm.module.css';
import { Link } from 'react-router-dom';
import Button, { ButtonStyle } from '../../button/Button';

type Props = {
  children: React.ReactNode[];
  onSubmit: () => void;
};

export default function SignupForm({ children, onSubmit }: Props) {
  return (
    <div className={styles.signup_form}>
      <h1 className={styles.form_title}>Sign up</h1>
      <form onSubmit={onSubmit}>
        {children}
        <Button type="submit" text="Sign up" style={ButtonStyle.submit_auth_form} />
      </form>
      <hr></hr>
      <Link to="/signin">Already have an account? Sign in</Link>
    </div>
  );
}
