import { createTheme } from '@mui/material/styles';

const getTheme = (darkMode = true) => {
  return createTheme({
    ...(darkMode ?
      //darkmode
      {
        palette: {
          text: {
            primary: '#fff',
          },
          background: {
            default: '#000',
          },
        },
      }
      //lightmode
    : {
        palette: {
          text: {
            primary: '#000',
          },
        },
      }),
  });
};
export default getTheme;
