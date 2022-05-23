import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import BoardService from '../../services/BoardService';
import { BoardFullData, Column, ColumnInfo, Task, TaskInfo } from '../../types/types';
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

const SelectedBoardSlice = createSlice({
  name: 'selectedBoard',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBoardById.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchBoardById.fulfilled.type]: (state, action: PayloadAction<BoardFullData>) => {
      state.isLoading = false;
      state.board = action.payload;
    },
    [fetchBoardById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ----- create column -------
    [fetchCreateColumn.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchCreateColumn.fulfilled.type]: (state, action: PayloadAction<Column>) => {
      state.isLoading = false;
      state.board.columns = [...state.board.columns, { ...action.payload, tasks: [] }];
    },
    [fetchCreateColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ----- update column  -------
    [fetchUpdateColumn.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
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
    [fetchDeleteColumn.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
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
    [fetchCreateTask.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
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
    [fetchUpdateTask.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
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
      state.board.columns[columnIndex].tasks[taskIndex] = {
        ...state.board.columns[columnIndex].tasks[taskIndex],
        ...action.payload.task,
      };
    },
    [fetchUpdateTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ----- delete column task -------
    [fetchDeleteTask.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
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
  },
});

export const selectedBoardReducer = SelectedBoardSlice.reducer;
