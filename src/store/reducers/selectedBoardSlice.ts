import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { batch } from 'react-redux';
import BoardService from '../../services/BoardService';
import {
  BoardFullData,
  Column,
  ColumnFullData,
  ColumnInfo,
  Task,
  TaskFullData,
  TaskInfo,
} from '../../types/types';
import { AppDispatch, RootState } from '../store';
import { fetchBoardById } from './boardsSlice';

type SelectedBoardState = {
  isLoading: boolean;
  error: string;
  board: BoardFullData;
};

const initialState: SelectedBoardState = {
  isLoading: false,
  error: '',
  board: {} as BoardFullData,
};

export const fetchCreateColumn = createAsyncThunk(
  'boards/column/createColumn',
  async ({ boardId, title }: { boardId: string } & ColumnInfo, { rejectWithValue }) => {
    try {
      const { data } = await BoardService.createColumn(boardId, { title });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { request, response } = error;
        if (response) {
          const { message } = response.data as { statusCode: string; message: string };
          return rejectWithValue(message || error.message);
        } else if (request) {
          return rejectWithValue(request.statusText || error.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export const fetchUpdateColumn = createAsyncThunk(
  'boards/column/updateColumn',
  async ({ boardId, id, title, order }: { boardId: string } & Column, { rejectWithValue }) => {
    try {
      const { data } = await BoardService.updateColumn(boardId, { id, title, order });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { request, response } = error;
        if (response) {
          const { message } = response.data as { statusCode: string; message: string };
          return rejectWithValue(message || error.message);
        } else if (request) {
          return rejectWithValue(request.statusText || error.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export const fetchDeleteColumn = createAsyncThunk(
  'boards/column/deleteColumn',
  async ({ boardId, columnId }: { boardId: string; columnId: string }, { rejectWithValue }) => {
    try {
      await BoardService.deleteColumn(boardId, columnId);
      return columnId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { request, response } = error;
        if (response) {
          const { message } = response.data as { statusCode: string; message: string };
          return rejectWithValue(message || error.message);
        } else if (request) {
          return rejectWithValue(request.statusText || error.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export const fetchCreateTask = createAsyncThunk(
  'boards/column/task/createTask',
  async ({ boardId, columnId, ...taskInfo }: TaskInfo, { rejectWithValue }) => {
    try {
      const { data } = await BoardService.createColumnTask({ boardId, columnId, ...taskInfo });
      return { columnId, task: data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { request, response } = error;
        if (response) {
          const { message } = response.data as { statusCode: string; message: string };
          return rejectWithValue(message || error.message);
        } else if (request) {
          return rejectWithValue(request.statusText || error.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export const fetchUpdateTask = createAsyncThunk(
  'boards/column/task/updateTask',
  async ({ boardId, columnId, id, ...taskInfo }: Task, { rejectWithValue }) => {
    try {
      const { data } = await BoardService.updateColumnTask({ boardId, columnId, id, ...taskInfo });
      return { columnId, task: data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { request, response } = error;
        if (response) {
          const { message } = response.data as { statusCode: string; message: string };
          return rejectWithValue(message || error.message);
        } else if (request) {
          return rejectWithValue(request.statusText || error.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export const fetchDeleteTask = createAsyncThunk(
  'boards/column/task/deleteTask',
  async (
    { boardId, columnId, id }: { boardId: string; columnId: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      await BoardService.deleteColumnTask(boardId, columnId, id);
      return { columnId, id };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { request, response } = error;
        if (response) {
          const { message } = response.data as { statusCode: string; message: string };
          return rejectWithValue(message || error.message);
        } else if (request) {
          return rejectWithValue(request.statusText || error.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export const fetchCreateTaskWithOrder = createAsyncThunk(
  'boards/column/task/createTaskWithOrder',
  async (
    { boardId, columnId, newOrder, ...taskInfo }: TaskInfo & { newOrder: number },
    { rejectWithValue }
  ) => {
    try {
      const { files, ...data } = (
        await BoardService.createColumnTask({ boardId, columnId, ...taskInfo })
      ).data;
      const updatedData = (await BoardService.updateColumnTask({ ...data, order: newOrder })).data;
      return { columnId, task: updatedData };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { request, response } = error;
        if (response) {
          const { message } = response.data as { statusCode: string; message: string };
          return rejectWithValue(message || error.message);
        } else if (request) {
          return rejectWithValue(request.statusText || error.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export const reorderTasks = createAsyncThunk(
  'boards/column/reorderTasks',
  async ({
    columnId,
    newOrderedTasks,
  }: {
    columnId: string;
    newOrderedTasks: [] | TaskFullData[];
  }) => {
    return { columnId, newOrderedTasks };
  }
);

export const reorderColumns = createAsyncThunk(
  'boards/column/reorderColumns',
  async (newOrderedColumns: [] | ColumnFullData[]) => {
    return newOrderedColumns;
  }
);

export async function updateColumnsOrder({
  boardId,
  id,
  title,
  order,
  newColumnsOrder,
}: { boardId: string; newColumnsOrder: [] | ColumnFullData[] } & Column) {
  return async (dispatch: AppDispatch) => {
    batch(async () => {
      await dispatch(
        fetchUpdateColumn({
          boardId,
          id,
          title,
          order,
        })
      );
      await dispatch(reorderColumns(newColumnsOrder));
    });
  };
}

export function updateTasksOrder({
  boardId,
  columnId,
  id,
  newOrderedTasks,
  ...taskInfo
}: Task & { newOrderedTasks: [] | TaskFullData[] }) {
  return (dispatch: AppDispatch) => {
    batch(async () => {
      await dispatch(
        fetchUpdateTask({
          boardId,
          columnId,
          id,
          ...taskInfo,
        })
      );
      await dispatch(
        reorderTasks({
          columnId,
          newOrderedTasks,
        })
      );
    });
  };
}

export async function updateTaskTransfer({
  boardId,
  newOrder,
  userId,
  deleteFromColumnId,
  columnId,
  deleteTaskId,
  ...taskInfo
}: TaskInfo & {
  newOrder: number;
  deleteFromColumnId: string;
  deleteTaskId: string;
}) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    batch(async () => {
      try {
        await BoardService.deleteColumnTask(boardId, deleteFromColumnId, deleteTaskId);
        await dispatch(
          fetchCreateTaskWithOrder({ boardId, columnId, userId, newOrder, ...taskInfo })
        );
        const { selectedBoard } = getState();

        const newSourceColumn =
          selectedBoard.board.columns[
            selectedBoard.board.columns.findIndex((column) => column.id === deleteFromColumnId)
          ];
        const newSourceColumnTasks = Array.from(newSourceColumn.tasks);
        newSourceColumnTasks.sort((task1, task2) => {
          return task1.order! - task2.order!;
        });
        const deletedTaskIndex = newSourceColumnTasks.findIndex((task) => task.id === deleteTaskId);
        newSourceColumnTasks.splice(deletedTaskIndex, 1);

        const newDestinationColumn =
          selectedBoard.board.columns[
            selectedBoard.board.columns.findIndex((column) => column.id === columnId)
          ];
        let newDestinationColumnTasks = Array.from(newDestinationColumn.tasks);
        newDestinationColumnTasks = newDestinationColumnTasks.map((task, index: number) => ({
          ...task,
          order: index + 1,
        }));

        await dispatch(
          reorderTasks({
            columnId: deleteFromColumnId,
            newOrderedTasks: newSourceColumnTasks,
          })
        );
        await dispatch(
          reorderTasks({
            columnId,
            newOrderedTasks: newDestinationColumnTasks,
          })
        );
      } catch (error) {
        return error;
      }
    });
  };
}

const SelectedBoardSlice = createSlice({
  name: 'selectedBoard',
  initialState,
  reducers: {},
  extraReducers: {
    // [fetchBoardById.pending.type]: (state) => {
    //   state.isLoading = true;
    //   state.error = '';
    // },
    [fetchBoardById.fulfilled.type]: (state, action: PayloadAction<BoardFullData>) => {
      state.isLoading = false;
      state.board = action.payload;
    },
    [fetchBoardById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ----- create column -------
    // [fetchCreateColumn.pending.type]: (state) => {
    //   state.isLoading = true;
    //   state.error = '';
    // },
    [fetchCreateColumn.fulfilled.type]: (state, action: PayloadAction<Column>) => {
      state.isLoading = false;
      state.board.columns = [...state.board.columns, { ...action.payload, tasks: [] }];
    },
    [fetchCreateColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ----- update column  -------
    // [fetchUpdateColumn.pending.type]: (state) => {
    //   state.isLoading = true;
    //   state.error = '';
    // },
    [fetchUpdateColumn.fulfilled.type]: (state, action: PayloadAction<Column>) => {
      state.isLoading = false;
      const columnIndex = state.board.columns.findIndex(
        (column) => column.id === action.payload.id
      );
      state.board.columns[columnIndex] = {
        ...state.board.columns[columnIndex],
        title: action.payload.title,
        order: action.payload.order,
      };
    },
    [fetchUpdateColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ----- delete column  -------
    // [fetchDeleteColumn.pending.type]: (state) => {
    //   state.isLoading = true;
    //   state.error = '';
    // },
    [fetchDeleteColumn.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      const columnIndex = state.board.columns.findIndex((column) => column.id === action.payload);
      state.board.columns.splice(columnIndex, 1);
    },
    [fetchDeleteColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ----- create column task -------
    // [fetchCreateTask.pending.type]: (state) => {
    //   state.isLoading = true;
    //   state.error = '';
    // },
    [fetchCreateTask.fulfilled.type]: (
      state,
      action: PayloadAction<{ columnId: string; task: Task }>
    ) => {
      state.isLoading = false;
      const columnIndex = state.board.columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      state.board.columns[columnIndex].tasks = [
        ...state.board.columns[columnIndex].tasks,
        { ...action.payload.task, files: [] },
      ];
    },
    [fetchCreateTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ----- update column task  -------
    // [fetchUpdateTask.pending.type]: (state) => {
    //   state.isLoading = true;
    //   state.error = '';
    // },
    [fetchUpdateTask.fulfilled.type]: (
      state,
      action: PayloadAction<{ columnId: string; task: Task }>
    ) => {
      state.isLoading = false;
      const columnIndex = state.board.columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      const taskIndex = state.board.columns[columnIndex].tasks.findIndex(
        (task) => task.id === action.payload.task.id
      );
      if (state.board.columns[columnIndex].tasks !== undefined) {
        state.board.columns[columnIndex].tasks[taskIndex] = {
          ...state.board.columns[columnIndex].tasks[taskIndex],
          ...action.payload.task,
        };
      }
    },
    [fetchUpdateTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ----- delete column task -------
    // [fetchDeleteTask.pending.type]: (state) => {
    //   state.isLoading = true;
    //   state.error = '';
    // },
    [fetchDeleteTask.fulfilled.type]: (
      state,
      action: PayloadAction<{ columnId: string; id: string }>
    ) => {
      state.isLoading = false;
      const columnIndex = state.board.columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      const taskIndex = state.board.columns[columnIndex].tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.board.columns[columnIndex].tasks.splice(taskIndex, 1);
    },
    [fetchDeleteTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // -------- reorder tasks in column-------------
    [reorderTasks.fulfilled.type]: (
      state,
      action: PayloadAction<{ columnId: string; newOrderedTasks: [] | TaskFullData[] }>
    ) => {
      const columnIndex = state.board.columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      state.board.columns[columnIndex].tasks = action.payload.newOrderedTasks;
    },

    // -------- reorder columns in board -------------
    [reorderColumns.fulfilled.type]: (state, action: PayloadAction<[] | ColumnFullData[]>) => {
      state.board.columns = action.payload;
    },

    //--------- create task with order
    // [fetchCreateTaskWithOrder.pending.type]: (state) => {
    //   state.isLoading = true;
    //   state.error = '';
    // },
    [fetchCreateTaskWithOrder.fulfilled.type]: (
      state,
      action: PayloadAction<{ columnId: string; task: Task }>
    ) => {
      state.isLoading = false;
      const columnIndex = state.board.columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      state.board.columns[columnIndex].tasks.sort((task1, task2) => {
        return task1.order! - task2.order!;
      });
      state.board.columns[columnIndex].tasks.splice(action.payload.task.order! - 1, 0, {
        ...action.payload.task,
        files: [],
      });
      state.board.columns[columnIndex].tasks = state.board.columns[columnIndex].tasks.map(
        (task, index: number) => ({
          ...task,
          order: index + 1,
        })
      );
    },
    [fetchCreateTaskWithOrder.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const selectedBoardReducer = SelectedBoardSlice.reducer;
