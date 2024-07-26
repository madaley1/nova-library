import { configureStore } from '@reduxjs/toolkit';
import libraryData from './libraryData';
import navData from './navData';
import resourceData from './resourceData';
import userSettings from './userSettings';

const store = configureStore({
  devTools: true,
  reducer: {
    userSettings,
    resourceData,
    navData,
    libraryData,
  },
});
export type IRootState = ReturnType<typeof store.getState>;

export default store;
