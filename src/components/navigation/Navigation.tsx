import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LinkButton from '../link/LinkButton';
import styles from './Navigation.module.css';
import NavigationItemsGroup from './NavigationItemsGroup';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

export default function Navigation({ children }: Props) {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className={styles.nav}>
      {location.pathname === '/' ? (
        <Link className={styles.logo} to="/" />
      ) : (
        <NavigationItemsGroup>
          <Link className={styles.logo} to="/" />
          <LinkButton path="/main" text={t('boards')} />
        </NavigationItemsGroup>
      )}
      {children}
    </nav>
  );
}
