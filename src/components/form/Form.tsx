import styles from './Form.module.css';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  onSubmit: () => void;
};

export default function Form({ children, onSubmit }: Props) {
  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
}
