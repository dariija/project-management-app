import SigninFormContainer from '../../form/signin/SigninFormContainer';
import styles from './SigninPage.module.css';

export default function SigninPage() {
  return (
    <div className={styles.signin_page_content}>
      <SigninFormContainer></SigninFormContainer>
    </div>
  );
}
