import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { boardsReducer } from './reducers/boardsSlice';
import { userReducer } from './reducers/userSlice';
import { selectedBoardReducer } from './reducers/selectedBoardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
    selectedBoard: selectedBoardReducer,
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
