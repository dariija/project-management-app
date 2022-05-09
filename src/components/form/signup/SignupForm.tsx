import styles from './SignupForm.module.css';
import { Link } from 'react-router-dom';

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
        <button className={styles.submit_btn} type="submit">
          Sign up
        </button>
      </form>
      <hr></hr>
      <Link to="/signin">Already have an account? Sign in</Link>
    </div>
  );
}
