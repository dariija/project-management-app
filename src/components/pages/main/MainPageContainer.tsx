import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { fetchAllBoards, fetchCreateBoard } from '../../../store/reducers/boardsSlice';
import { BoardInfo } from '../../../types/types';
import BoardFormContainer from '../../form/BoardFormContainer';
import Loader from '../../loader/Loader';
import ModalContainer from '../../modal/ModalContainer';
import Notification from '../../notification/Notification';
import BoardsList from '../../boards-list/BoardsList';
import CreateBoardButton from '../../button/CreateBoardButton';
import MainPage from './MainPage';

export default function MainPageContainer() {
  const dispatch = useAppDispatch();
  const { boards, isLoading, error } = useAppSelector((state) => state.boards);
  const [openCreateBoardModal, setOpenCreateBoardModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, []);

  const showCreateBoardModal = () => {
    setOpenCreateBoardModal(true);
  };

  const createBoard = ({ title, description }: BoardInfo) => {
    dispatch(fetchCreateBoard({ title, description }));
    setOpenCreateBoardModal(false);
  };

  return (
    <MainPage>
      {isLoading && <Loader />}
      {error && <Notification text={error} />}

      <BoardsList boards={boards}>
        <CreateBoardButton onClick={showCreateBoardModal} />
      </BoardsList>

      <ModalContainer isOpen={openCreateBoardModal}>
        <BoardFormContainer
          formTitle="Create Board"
          cancelAction={() => setOpenCreateBoardModal(false)}
          confirmAction={createBoard}
        />
      </ModalContainer>
    </MainPage>
  );
}
