import { createSlice } from '@reduxjs/toolkit';

export type userSettingsState = {
  userSettings: {
    darkMode: boolean;
  };
};
const defaultSettings = {
  darkMode: true,
};

const updateLocalStorage = (newuserSettings: Record<string, any>) => {
  localStorage.setItem('NL__userSettings', JSON.stringify(newuserSettings));
};

const userSettings = createSlice({
  name: 'User Settings',
  initialState: defaultSettings,
  reducers: {
    toggleDarkMode: (state) => {
      const newState = { ...state, darkMode: !state.darkMode };
      updateLocalStorage(newState);
      return newState;
    },
    setDarkMode: (state, action) => {
      const newState = { ...state, darkMode: action.payload };
      updateLocalStorage(newState);
      return newState;
    },
    setExistingUserSettings: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { toggleDarkMode, setDarkMode, setExistingUserSettings } = userSettings.actions;
export default userSettings.reducer;
