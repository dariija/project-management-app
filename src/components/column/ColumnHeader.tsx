import styles from './ColumnHeader.module.css';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

export default function ColumnHeader({ children }: Props) {
  return <div className={styles.column_header}>{children}</div>;
}
