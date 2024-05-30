import { createSlice } from '@reduxjs/toolkit';

export type NavLink = {
  href: string;
  title: string;
};
export type NavData = {
  navLinks: NavLink[];
};

const navData = createSlice({
  name: 'Resource Data',
  initialState: {
    navLinks: Array<NavLink>(),
  },
  reducers: {
    setNavData: (state, action) => ({
      ...state,
      navLinks: action.payload,
    }),
    addNewLink: (state, action) => {
      const newLinkList = [...state.navLinks, action.payload];
      return { ...state, navLinks: newLinkList };
    },
  },
});

export const { setNavData, addNewLink } = navData.actions;
export default navData.reducer;
