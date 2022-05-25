import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { fetchBoardById } from '../../../store/reducers/boardsSlice';
import { fetchCreateColumn } from '../../../store/reducers/selectedBoardSlice';
import CreateButton from '../../button/CreateButton';
import ColumnsList from '../../columns-list/ColumnsList';
import ColumnFormContainer from '../../form/ColumnFormContainer';
import Loader from '../../loader/Loader';
import ModalContainer from '../../modal/ModalContainer';
import Notification from '../../notification/Notification';
import TaskDetailsBoard from '../../task-details-board/TaskDetailsBoard';

export default function BoardPageContainer() {
  const params = useParams();

  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.selectedBoard.board.columns);
  const { board, isLoading, error } = useAppSelector((state) => state.selectedBoard);
  const [openCreateColumnModal, setOpenCreateColumnModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBoardById(params.id as string));
  }, []);

  const showCreateColumnModal = () => {
    setOpenCreateColumnModal(true);
  };

  const createColumn = (title: string) => {
    dispatch(fetchCreateColumn({ boardId: board.id, title }));
    setOpenCreateColumnModal(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <Notification text={error} />}

      {columns && (
        <ColumnsList columns={columns}>
          <CreateButton onClick={showCreateColumnModal} text="Add column" />
        </ColumnsList>
      )}

      <TaskDetailsBoard />

      <ModalContainer isOpen={openCreateColumnModal}>
        <ColumnFormContainer
          formTitle="Create Column"
          cancelAction={() => setOpenCreateColumnModal(false)}
          confirmAction={createColumn}
        />
      </ModalContainer>
    </>
  );
}
