import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { DragItemsType } from "../../../drag'n'drop/dragTypes";
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { fetchBoardById } from '../../../store/reducers/boardsSlice';
import {
  fetchCreateColumn,
  updateTaskTransfer,
  updateColumnsOrder,
  updateTasksOrder,
} from '../../../store/reducers/selectedBoardSlice';
import { ColumnFullData, TaskFullData } from '../../../types/types';
import CreateButton from '../../button/CreateButton';
import ColumnsList from '../../columns-list/ColumnsList';
import ColumnFormContainer from '../../form/ColumnFormContainer';
import Loader from '../../loader/Loader';
import ModalContainer from '../../modal/ModalContainer';
import Notification from '../../notification/Notification';
import TaskDetailsBoard from '../../task-details-board/TaskDetailsBoard';

export default function BoardPageContainer() {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const columnsArr = useAppSelector((state) => state.selectedBoard.board.columns);
  const { board, isLoading, error } = useAppSelector((state) => state.selectedBoard);

  const [columns, setColumns] = useState<[] | ColumnFullData[] | null>(null);
  const [openCreateColumnModal, setOpenCreateColumnModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBoardById(params.id as string));
  }, []);

  useEffect(() => {
    if (columnsArr) {
      const ordered = Array.from(columnsArr).sort((column1, column2) => {
        return column1.order! - column2.order!;
      });
      setColumns(ordered);
    }
  }, [columnsArr]);

  const showCreateColumnModal = () => {
    setOpenCreateColumnModal(true);
  };

  const createColumn = (title: string) => {
    dispatch(fetchCreateColumn({ boardId: board.id, title }));
    setOpenCreateColumnModal(false);
  };

  const onDragEnd = async (result: DropResult) => {
    if (columns) {
      const { source, destination, draggableId, type, mode } = result;
      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index)
        return;

      if (type === DragItemsType.COLUMN) {
        let newColumnsOrder: ColumnFullData[] = Array.from(columns);
        const spliced = newColumnsOrder.splice(source.index, 1)[0];
        newColumnsOrder.splice(destination.index, 0, spliced);
        newColumnsOrder = newColumnsOrder.map((column, index: number) => ({
          ...column,
          order: index + 1,
        }));
        setColumns(newColumnsOrder);

        await dispatch(
          await updateColumnsOrder({
            boardId: board.id,
            id: draggableId,
            title: spliced.title,
            order: destination.index + 1,
            newColumnsOrder,
          })
        );
        return;
      }

      if (type === DragItemsType.TASK_CARD) {
        const sourceColumn =
          columns[columns.findIndex((column) => column.id === source.droppableId)];
        const destinationColumn =
          columns[columns.findIndex((column) => column.id === destination.droppableId)];

        if (sourceColumn === destinationColumn) {
          const tasks = Array.from(sourceColumn.tasks);
          tasks.sort((task1, task2) => {
            return task1.order! - task2.order!;
          });

          const spliced = tasks.splice(source.index, 1)[0];
          tasks.splice(destination.index, 0, spliced);
          const newTasksOrder = tasks.map((task, index: number) => ({
            ...task,
            order: index + 1,
          }));
          const newData: ColumnFullData[] = columns.map((column: ColumnFullData) => {
            if (column.id === source.droppableId) {
              return { ...column, tasks: newTasksOrder };
            } else return column;
          });

          setColumns(newData);
          dispatch(
            updateTasksOrder({
              boardId: board.id,
              columnId: source.droppableId,
              id: draggableId,
              title: spliced.title,
              description: spliced.description,
              userId: spliced.userId,
              order: destination.index + 1,
              newOrderedTasks: newTasksOrder,
            })
          );
          return;
        } else {
          const sourceColumnTasks = Array.from(sourceColumn.tasks);
          sourceColumnTasks.sort((task1, task2) => {
            return task1.order! - task2.order!;
          });
          const spliced = sourceColumnTasks.splice(source.index, 1)[0];

          let destinationColumnTasks = Array.from(destinationColumn.tasks);
          destinationColumnTasks.sort((task1, task2) => {
            return task1.order! - task2.order!;
          });
          destinationColumnTasks.splice(destination.index, 0, spliced);
          destinationColumnTasks = destinationColumnTasks.map((task, index) => {
            return { ...task, order: index + 1 };
          });

          const newSourceColumn = {
            ...sourceColumn,
            tasks: sourceColumnTasks,
          };
          const newDestinationColumn = {
            ...destinationColumn,
            tasks: destinationColumnTasks,
          };
          const newColumnsData: ColumnFullData[] = columns.map((column: ColumnFullData) => {
            if (column.id === source.droppableId) {
              return { ...column, ...newSourceColumn };
            } else if (column.id === destination.droppableId) {
              return { ...column, ...newDestinationColumn };
            } else return column;
          });

          setColumns(newColumnsData);
          dispatch(
            await updateTaskTransfer({
              boardId: board.id,
              deleteFromColumnId: source.droppableId,
              columnId: destination.droppableId,
              deleteTaskId: draggableId,
              userId: spliced.userId,
              title: spliced.title,
              description: spliced.description,
              newOrder: destination.index + 1,
            })
          );
        }
      }
    }
  };

  const onDragStart = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {/* {isLoading && <Loader />} */}
      {error && <Notification text={error} />}

      {columns && (
        <>
          <ColumnsList columns={columns}>
            <CreateButton onClick={showCreateColumnModal} text={t('add_column')} />
          </ColumnsList>
        </>
      )}

      <TaskDetailsBoard />

      <ModalContainer isOpen={openCreateColumnModal}>
        <ColumnFormContainer
          formTitle={t('add_column')}
          cancelAction={() => setOpenCreateColumnModal(false)}
          confirmAction={createColumn}
        />
      </ModalContainer>
    </DragDropContext>
  );
}
