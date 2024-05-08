import { configureStore } from '@reduxjs/toolkit';
import resourceData from './resourceData';
import userSettings from './userSettings';

const store = configureStore({
  devTools: true,
  reducer: {
    userSettings,
    resourceData,
  },
});

store.subscribe(() => {});

export default store;
