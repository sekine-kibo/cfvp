import { configureStore } from '@reduxjs/toolkit';
import kintoneReducer from './kintoneSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    kintone: kintoneReducer,
    settings: settingsReducer,
  },
});
