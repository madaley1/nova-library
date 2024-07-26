import { createSlice } from '@reduxjs/toolkit';

const resourceData = createSlice({
  name: 'Resource Data',
  initialState: {
    currentData: Array<Record<string, any>>(),
    columnNames: Array<string>(),
    editModalData: <Record<string, any>>{},
  },
  reducers: {
    setResourceData: (state, action) => ({ ...state, currentData: action.payload }),
    setColumnNames: (state, action) => ({ ...state, columnNames: action.payload }),
  },
});

export const { setResourceData, setColumnNames } = resourceData.actions;
export default resourceData.reducer;
