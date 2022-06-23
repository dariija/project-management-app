import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks/hooks';
import { fetchDeleteTask, fetchUpdateTask } from '../../store/reducers/selectedBoardSlice';
import { TaskFullData } from '../../types/types';
import Confirmation from '../confirmation/Confirmation';
import ModalContainer from '../modal/ModalContainer';
import TaskDetailsBoardContainer from '../task-details-board/TaskDetailsBoardContainer';
import Task from './Task';

type Props = TaskFullData;

export default function TaskContainer({
  boardId,
  columnId,
  id,
  title,
  description,
  userId,
  order,
}: Props) {
  const dispatch = useAppDispatch();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openTaskDetailsBoard, setOpenTaskDetailsBoard] = useState(false);

  const showConfirmationModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenConfirmationModal(true);
  };

  const deleteTask = () => {
    dispatch(fetchDeleteTask({ boardId, columnId, id }));
    setOpenConfirmationModal(false);
  };

  const editTask = (newTitle: string, newDescription: string) => {
    if (newTitle !== title || newDescription !== description) {
      dispatch(
        fetchUpdateTask({
          boardId,
          columnId,
          id,
          title: newTitle,
          description: newDescription,
          userId,
          order,
        })
      );
    }
    setOpenTaskDetailsBoard(false);
  };

  return (
    <>
      <Task
        id={id}
        isSelected={openTaskDetailsBoard}
        deleteTask={showConfirmationModal}
        title={title}
        showTaskDetails={() => setOpenTaskDetailsBoard(true)}
      />

      <ModalContainer isOpen={openConfirmationModal}>
        <Confirmation
          cancelAction={() => setOpenConfirmationModal(false)}
          confirmAction={deleteTask}
        />
      </ModalContainer>

      <TaskDetailsBoardContainer
        id={id}
        isOpen={openTaskDetailsBoard}
        title={title}
        description={description}
        editTask={editTask}
      ></TaskDetailsBoardContainer>
    </>
  );
}
