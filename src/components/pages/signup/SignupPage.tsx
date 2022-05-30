import SignupFormContainer from '../../form/signup/SignupFormContainer';
import styles from './SignupPage.module.css';

export default function SignupPage() {
  return (
    <div className={styles.signup_page_content}>
      <SignupFormContainer></SignupFormContainer>
    </div>
  );
}
