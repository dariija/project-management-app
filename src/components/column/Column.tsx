import styles from './Column.module.css';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

export default function Column({ children }: Props) {
  return (
    <>
      <div className={styles.column}>{children}</div>
    </>
  );
}
