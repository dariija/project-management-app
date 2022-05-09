import styles from './SigninForm.module.css';
import { Link } from 'react-router-dom';

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
        <button className={styles.submit_btn} type="submit">
          Sign in
        </button>
      </form>
      <hr></hr>
      <Link to="/signup">Don&apos;t have account yet? Register</Link>
    </div>
  );
}
