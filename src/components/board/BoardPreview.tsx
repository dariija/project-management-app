import { Link } from 'react-router-dom';
import styles from './BoardPreview.module.css';
import kanban from '../../assets/svg/kanban.svg';
import { Board } from '../../types/types';
import Button, { ButtonStyle } from '../button/Button';

type Props = Board & {
  editBoard: (e: React.MouseEvent) => void;
  deleteBoard: (e: React.MouseEvent, id: string) => void;
};
export default function BoardPreview({ id, title, description, editBoard, deleteBoard }: Props) {
  return (
    <Link to={`/board/${id}`} className={styles.board_link} key={id}>
      <div className={styles.board}>
        <img className={styles.board_img} src={kanban} alt={`${title}_board_img`} />
        <div className={styles.board_info}>
          <div className={styles.board_header}>
            <h3>{title}</h3>
            <div className={styles.buttons_group}>
              <Button type="button" style={ButtonStyle.edit} onClick={editBoard} />
              <Button type="button" style={ButtonStyle.bin} onClick={(e) => deleteBoard(e, id)} />
            </div>
          </div>
          <div className={styles.board_description}>{description}</div>
        </div>
      </div>
    </Link>
  );
}
