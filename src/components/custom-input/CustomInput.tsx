import { FieldError } from 'react-hook-form/dist/types/errors';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import styles from './CustomInput.module.css';

type Props = {
  type: string;
  label: string;
  name: string;
  id: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
};

export default function CustomInput({ type, label, name, id, register, error }: Props) {
  return (
    <div className={styles.form_group}>
      <label className={error ? styles.label_error : styles.label} htmlFor={name}>
        <input className={styles.input} type={type} id={id} {...register} />
        <div className={styles.label_text}>{label}</div>
      </label>
      {error && <div className={styles.error_message}>{error.message}</div>}
    </div>
  );
}
