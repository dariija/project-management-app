import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../store/hooks/hooks';
import AuthorizedUserNavigation from '../navigation/authorized-user/AuthorizedUserNavigation';
import Navigation from '../navigation/Navigation';
import UnauthorizedUserNavigation from '../navigation/unauthorized-user/UnauthorizedUserNavigation';
import { Header } from './Header';
import styles from './Header.module.css';

export default function HeaderContainer() {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const headerEl = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const scroll = function () {
      if (headerEl.current) {
        window.pageYOffset > headerEl.current.offsetHeight
          ? headerEl.current.classList.add(`${styles.scrolled}`)
          : headerEl.current.classList.remove(`${styles.scrolled}`);
      }
    };
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, []);

  return (
    <Header ref={headerEl}>
      <Navigation>
        {isAuth ? <AuthorizedUserNavigation /> : <UnauthorizedUserNavigation />}
      </Navigation>
    </Header>
  );
}
