import { ForwardedRef, forwardRef } from 'react';
import styles from './Header.module.css';

type Props = {
  children: React.ReactNode;
};

export const Header = forwardRef(({ children }: Props, ref: ForwardedRef<HTMLElement>) => {
  return (
    <header className={styles.header} ref={ref}>
      {children}
    </header>
  );
});
