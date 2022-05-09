import { Link } from 'react-router-dom';
import SelectLanguageContainer from '../../select/SelectLanguageContainer';
import styles from './UnauthorizedUserNavigation.module.css';

export default function UnauthorizedUserNavigation() {
  return (
    <nav className={styles.nav}>
      <Link className={`${styles.btn_link} ${styles.logo}`} to="/" />
      <div className={styles.nav_right_block}>
        <SelectLanguageContainer />
        <Link className={`${styles.btn_link} ${styles.btn}`} to="/signin">
          Sign in
        </Link>
        <Link className={`${styles.btn_link} ${styles.btn}`} to="/signup">
          Sign up
        </Link>
      </div>
    </nav>
  );
}
