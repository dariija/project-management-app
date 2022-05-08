import { useEffect, useRef } from 'react';
import UnauthorizedUserNavigation from '../navigation/unauthorized-user/UnauthorizedUserNavigation';
import { Header } from './Header';
import styles from './Header.module.css';

export default function HeaderContainer() {
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
      <UnauthorizedUserNavigation />
    </Header>
  );
}
