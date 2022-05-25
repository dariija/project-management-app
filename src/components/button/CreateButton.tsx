import styles from './CreateButton.module.css';

type Props = {
  onClick: () => void;
  text: string;
};

export default function CreateButton({ onClick, text }: Props) {
  return (
    <button className={styles.add_button} onClick={onClick}>
      <span className={styles.plus}>&#43;</span>
      <span>{text}</span>
    </button>
  );
}
