import styles from './CreateBoardButton.module.css';

type Props = {
  onClick: () => void;
};
export default function CreateBoardButton({ onClick }: Props) {
  return <button className={styles.create_button} onClick={onClick}></button>;
}
