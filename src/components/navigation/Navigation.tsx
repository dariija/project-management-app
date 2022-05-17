import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

export default function Navigation({ children }: Props) {
  return (
    <nav className={styles.nav}>
      <Link className={styles.logo} to="/" />
      {children}
    </nav>
  );
}
