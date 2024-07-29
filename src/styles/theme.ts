import { blue, deepOrange, deepPurple, green } from '@mui/material/colors';
import { createTheme, ThemeOptions } from '@mui/material/styles';

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: green,
    secondary: deepPurple,
    background: {
      default: '#162316',
      paper: '#243332',
    },
  },
};

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: blue,
    secondary: deepOrange,
    background: {
      default: '#ececec',
      paper: '#e1d8ef',
    },
  },
};

const getTheme = (darkMode = true) => {
  return createTheme(darkMode ? darkTheme : lightTheme);
};
export default getTheme;
