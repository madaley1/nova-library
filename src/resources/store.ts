import { configureStore } from '@reduxjs/toolkit';
import userSettings from './userSettings';

const store = configureStore({
  devTools: true,
  reducer: {
    userSettings,
  },
});

store.subscribe(() => {
  localStorage.setItem('NL__userSettings', JSON.stringify(store.getState().userSettings));
});

export default store;
