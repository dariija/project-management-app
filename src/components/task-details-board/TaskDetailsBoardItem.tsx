import styles from './TaskDetailsBoardItem.module.css';

type Props = {
  children: React.ReactElement | React.ReactElement[];
  labelText?: string;
  error: boolean;
  errorText: string;
};

export default function TaskDetailsBoardItem({ children, error, errorText, labelText }: Props) {
  return (
    <div className={styles.desription_details_group}>
      {labelText && <div className={styles.label_text}>{labelText}</div>}
      <label className={error ? styles.label_error : styles.label}>{children}</label>
      {error && <div className={styles.error_message}>{errorText}</div>}
    </div>
  );
}
