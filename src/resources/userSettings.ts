import { createAction, createSlice } from '@reduxjs/toolkit';

export type userSettingsState = {
  userSettings: {
    darkMode: boolean;
  };
};
const defaultSettings = {
  darkMode: true,
};

const userSettings = createSlice({
  name: 'User Settings',
  initialState: defaultSettings,
  reducers: {
    toggleDarkMode: (state) => ({ ...state, darkMode: !state.darkMode }),
    setDarkMode: (state, action) => ({ ...state, darkMode: action.payload }),
    setExistingUserSettings: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { toggleDarkMode, setDarkMode, setExistingUserSettings } = userSettings.actions;
export default userSettings.reducer;
