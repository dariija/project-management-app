import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { boardsReducer } from './reducers/boardsSlice';
import { userReducer } from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
