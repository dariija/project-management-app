import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import BoardService from '../../services/BoardsService';
import { Board } from '../../types/types';

type BoardsState = {
  isLoading: boolean;
  error: string;
  boards: [] | Board[];
};

const initialState: BoardsState = {
  isLoading: false,
  error: '',
  boards: [],
};

export const fetchAllBoards = createAsyncThunk(
  'boards/getAllBoards',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await BoardService.getAllBoards();
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

export const fetchCreateBoard = createAsyncThunk(
  'boards/createBoard',
  async ({ title, description }: { title: string; description: string }, { rejectWithValue }) => {
    try {
      const { data } = await BoardService.createBoard(title, description);
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

export const fetchUpdateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, title, description }: Board, { rejectWithValue }) => {
    try {
      const { data } = await BoardService.updateBoard(id, title, description);
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

export const fetchDeleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id: string, { rejectWithValue }) => {
    try {
      await BoardService.deleteBoard(id);
      return id;
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

const BoardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: {
    // ----- get all boards -------
    [fetchAllBoards.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchAllBoards.fulfilled.type]: (state, action: PayloadAction<[] | Board[]>) => {
      state.isLoading = false;
      state.boards = action.payload;
    },
    [fetchAllBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // ----- create board -------
    [fetchCreateBoard.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchCreateBoard.fulfilled.type]: (state, action: PayloadAction<Board>) => {
      state.isLoading = false;
      state.boards = [...state.boards, action.payload];
    },
    [fetchCreateBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // ----- update board -------
    [fetchUpdateBoard.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchUpdateBoard.fulfilled.type]: (state, action: PayloadAction<Board>) => {
      state.isLoading = false;
      const { id, title, description } = action.payload;
      state.boards = state.boards.map((board) =>
        board.id === id ? { id, title, description } : board
      );
    },
    [fetchUpdateBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // ----- delete board -------
    [fetchDeleteBoard.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchDeleteBoard.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
    [fetchDeleteBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const boardsReducer = BoardSlice.reducer;
