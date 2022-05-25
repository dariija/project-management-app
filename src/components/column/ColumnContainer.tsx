import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  fetchDeleteColumn,
  fetchUpdateColumn,
  fetchCreateTask,
} from '../../store/reducers/selectedBoardSlice';
import { ColumnFullData } from '../../types/types';
import CreateButton from '../button/CreateButton';
import Confirmation from '../confirmation/Confirmation';
import TaskFormContainer from '../form/TaskFormContainer';
import ModalContainer from '../modal/ModalContainer';
import TasksList from '../tasks-list/TasksList';
import Column from './Column';
import ColumnHeaderContainer from './ColumnHeaderContainer';

type Props = ColumnFullData;

export default function ColumnContainer({ id, title, order, tasks }: Props) {
  const dispatch = useAppDispatch();
  const boardId = useAppSelector((state) => state.selectedBoard.board.id);
  const userId = useAppSelector((state) => state.user.user.id);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);

  const editColumnTitle = (newTitle: string) => {
    if (title !== newTitle) dispatch(fetchUpdateColumn({ boardId, id, title: newTitle, order }));
  };

  const deleteColumn = () => {
    dispatch(fetchDeleteColumn({ boardId, columnId: id }));
    setOpenConfirmationModal(false);
  };

  const showConfirmationModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenConfirmationModal(true);
  };

  const showCreateTaskModal = () => {
    setOpenCreateTaskModal(true);
  };

  const createTask = (title: string, description: string) => {
    dispatch(
      fetchCreateTask({
        boardId,
        columnId: id,
        title,
        description,
        userId,
      })
    );
    setOpenCreateTaskModal(false);
  };

  return (
    <>
      <Column>
        <ColumnHeaderContainer
          title={title}
          deleteColumn={showConfirmationModal}
          editColumnTitle={editColumnTitle}
        />
        <TasksList tasks={tasks}></TasksList>
        <CreateButton onClick={showCreateTaskModal} text="Add task" />
      </Column>

      <ModalContainer isOpen={openConfirmationModal}>
        <Confirmation
          cancelAction={() => setOpenConfirmationModal(false)}
          confirmAction={deleteColumn}
        />
      </ModalContainer>

      <ModalContainer isOpen={openCreateTaskModal}>
        <TaskFormContainer
          formTitle="Create task"
          cancelAction={() => setOpenCreateTaskModal(false)}
          confirmAction={createTask}
        />
      </ModalContainer>
    </>
  );
}
