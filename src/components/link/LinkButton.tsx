import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css';

type Props = {
  path: string;
  text: string;
};
export default function LinkButton({ path, text }: Props) {
  return (
    <Link className={styles.btn_link} to={path}>
      {text}
    </Link>
  );
}
