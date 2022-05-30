import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/hooks';
import LinkButton from '../link/LinkButton';
import styles from './Navigation.module.css';
import NavigationItemsGroup from './NavigationItemsGroup';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

export default function Navigation({ children }: Props) {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const location = useLocation();
  console.log(location.pathname);
  const { t } = useTranslation();

  return (
    <nav className={styles.nav}>
      {isAuth && location.pathname !== '/' ? (
        <NavigationItemsGroup>
          <Link className={styles.link_logo} to="/">
            <div className={styles.logo}></div>
          </Link>
          <LinkButton path="/main" text={t('boards')} />
        </NavigationItemsGroup>
      ) : (
        <Link className={styles.logo} to="/" />
      )}
      {children}
    </nav>
  );
}
