import { Board } from '../../types/types';
import BoardPreviewContainer from '../board/BoardPreviewContainer';
import styles from './BoardsList.module.css';

type Props = {
  boards: [] | Board[];
  children: React.ReactElement;
};

export default function BoardsList({ boards, children }: Props) {
  return (
    <ul className={styles.boards}>
      {boards.map((board) => {
        return (
          <li key={board.id}>
            <BoardPreviewContainer {...board} key={board.id} />{' '}
          </li>
        );
      })}
      <li>{children}</li>
    </ul>
  );
}
