import { TaskFullData } from '../../types/types';
import TaskContainer from '../task/TaskContainer';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styles from './TasksList.module.css';
import { DragItemsType } from "../../drag'n'drop/dragTypes";

type Props = {
  tasks: [] | TaskFullData[];
  columnId: string;
};

export default function TasksList({ tasks, columnId }: Props) {
  const orderedTasks = [...tasks].sort((task1, task2) => {
    return task1.order! - task2.order!;
  });

  return (
    <Droppable droppableId={columnId} type={DragItemsType.TASK_CARD}>
      {(provided, snapshot) => (
        <ul className={styles.tasks} ref={provided.innerRef} {...provided.droppableProps}>
          {orderedTasks.map((task, index) => {
            return (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskContainer {...task} key={task.id} />
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
