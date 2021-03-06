import styles from './Main.module.css';

type Props = {
  children: React.ReactNode;
};

export default function Main({ children }: Props) {
  return (
    <main id="main" className={styles.main}>
      {children}
    </main>
  );
}
