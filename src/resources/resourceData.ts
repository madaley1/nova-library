import { createSlice } from '@reduxjs/toolkit';

const resourceData = createSlice({
  name: 'Resource Data',
  initialState: {
    currentData: {},
    columnNames: [],
    editModalData: {},
  },
  reducers: {
    setResourceData: (state, action) => ({ ...state, currentData: action.payload }),
  },
});

export const { setResourceData } = resourceData.actions;
export default resourceData.reducer;
