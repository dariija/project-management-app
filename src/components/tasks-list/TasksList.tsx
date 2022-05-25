import { TaskFullData } from '../../types/types';
import TaskContainer from '../task/TaskContainer';
import styles from './TasksList.module.css';

type Props = {
  tasks: [] | TaskFullData[];
};

export default function TasksList({ tasks }: Props) {
  return (
    <ul className={styles.tasks}>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <TaskContainer {...task} key={task.id} />
          </li>
        );
      })}
    </ul>
  );
}
