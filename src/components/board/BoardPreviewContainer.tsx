import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks/hooks';
import { fetchUpdateBoard, fetchDeleteBoard } from '../../store/reducers/boardsSlice';
import { Board, BoardInfo } from '../../types/types';
import Confirmation from '../confirmation/Confirmation';
import BoardFormContainer from '../form/BoardFormContainer';
import ModalContainer from '../modal/ModalContainer';
import BoardPreview from './BoardPreview';

type Props = Board;

export default function BoardPreviewContainer({ id, title, description }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openEditBoardModal, setOpenEditBoardModal] = useState(false);

  const editBoard = ({ title, description }: BoardInfo) => {
    dispatch(fetchUpdateBoard({ id, title, description }));
    setOpenEditBoardModal(false);
  };

  const showEditBoardModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenEditBoardModal(true);
  };

  const deleteBoard = () => {
    dispatch(fetchDeleteBoard(id));
    setOpenEditBoardModal(false);
  };

  const showConfirmationModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenConfirmationModal(true);
  };

  return (
    <>
      <BoardPreview
        {...{ id, title, description }}
        editBoard={showEditBoardModal}
        deleteBoard={showConfirmationModal}
      />

      <ModalContainer isOpen={openConfirmationModal}>
        <Confirmation
          cancelAction={() => setOpenConfirmationModal(false)}
          confirmAction={deleteBoard}
        />
      </ModalContainer>

      <ModalContainer isOpen={openEditBoardModal}>
        <BoardFormContainer
          cancelAction={() => setOpenEditBoardModal(false)}
          confirmAction={editBoard}
          boardData={{ title, description }}
          formTitle={t('edit_board')}
        />
      </ModalContainer>
    </>
  );
}
