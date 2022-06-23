import Button, { ButtonStyle } from '../button/Button';
import styles from './Task.module.css';

type Props = {
  isSelected: boolean;
  deleteTask: (e: React.MouseEvent) => void;
  title: string;
  showTaskDetails: () => void;
  id: string;
};

export default function Task({ id, isSelected, deleteTask, title, showTaskDetails }: Props) {
  return (
    <div
      className={isSelected ? `${styles.task_card_selected}` : `${styles.task_card}`}
      onClick={showTaskDetails}
      data-task-id={id}
    >
      <div className={styles.task_title}>{title}</div>
      <Button onClick={deleteTask} type="button" style={ButtonStyle.delete_by_hover_task} />
    </div>
  );
}
