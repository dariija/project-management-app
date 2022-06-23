import styles from './FormTitle.module.css';

type Props = {
  text: string;
};

export default function FormTitle({ text }: Props) {
  return <h2 className={styles.title}>{text}</h2>;
}
