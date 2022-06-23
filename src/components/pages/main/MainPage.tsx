import styles from './MainPage.module.css';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function MainPage({ children }: Props) {
  return <div className={styles.main_page}>{children}</div>;
}
