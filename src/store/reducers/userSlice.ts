import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService from '../../services/AuthService';
import { User, UserToken } from '../../types/types';
import { API } from '../../utils/API';
import { decodeJWTPayload } from '../../utils/JWTDecode';

type UserAuth = {
  isAuth: boolean | null;
  isLoading: boolean;
  error: string;
  user: User;
};

const initial: UserAuth = {
  isAuth: null,
  isLoading: false,
  error: '',
  user: {
    id: '',
    name: '',
    login: '',
  },
};

export const fetchSigninUser = createAsyncThunk(
  'user/signin',
  async ({ login, password }: { login: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.signin(login, password);
      const userData = decodeJWTPayload(data.token);
      return { token: data.token, ...userData };
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

export const fetchSignupUser = createAsyncThunk(
  'user/signup',
  async (
    { name, login, password }: { name: string; login: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await AuthService.signup(name, login, password);
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

export const checkAuth = createAsyncThunk('user/checkAuth', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  try {
    if (token) {
      const userData = decodeJWTPayload(token);
      await API.get(`/users/${userData.id}`);
      return userData;
    } else {
      throw new Error();
    }
  } catch (error) {
    return rejectWithValue('');
  }
});

const UserSlice = createSlice({
  name: 'user',
  initialState: initial,
  reducers: {
    signoutUser: (state) => {
      AuthService.signout();
      state.isAuth = false;
      state.user = { id: '', name: '', login: '' };
    },
    clearUserAuthError: (state) => {
      state.error = '';
    },
  },
  extraReducers: {
    [fetchSignupUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchSignupUser.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [fetchSignupUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchSigninUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchSigninUser.fulfilled.type]: (state, action: PayloadAction<UserToken & User>) => {
      state.isLoading = false;
      state.isAuth = true;
      const { token, ...userData } = action.payload;
      localStorage.setItem('token', token);
      state.user = { ...userData };
    },
    [fetchSigninUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [checkAuth.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [checkAuth.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
    },
    [checkAuth.rejected.type]: (state) => {
      state.isLoading = false;
      state.isAuth = false;
    },
  },
});

export const userReducer = UserSlice.reducer;
export const { signoutUser, clearUserAuthError } = UserSlice.actions;
