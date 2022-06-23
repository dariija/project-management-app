import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import styles from './CustomTextArea.module.css';

type Props = {
  label: string;
  name: string;
  id: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
};

export default function CustomTextArea({ label, name, id, register, error }: Props) {
  return (
    <div className={styles.form_group}>
      <label className={error ? styles.label_error : styles.label} htmlFor={name}>
        <textarea className={styles.textarea} id={id} {...register} maxLength={100} />
        <div className={styles.label_text}>{label}</div>
      </label>
      {error && <div className={styles.error_message}>{error.message}</div>}
    </div>
  );
}
