import { createSlice } from '@reduxjs/toolkit';

const resourceData = createSlice({
  name: 'Resource Data',
  initialState: {
    currentData: Array<Record<string, any>>(),
    columnNames: Array<string>(),
    editModalData: <Record<string, any>>{},
    multiSelectData: <Record<string, string[]>>{},
    selectData: <Record<string, string[]>>{},
  },
  reducers: {
    setResourceData: (state, action) => ({ ...state, currentData: action.payload }),
    setColumnNames: (state, action) => ({ ...state, columnNames: action.payload }),
    setMultiSelectData: (state, action) => ({ ...state, multiSelectData: action.payload }),
    setSelectData: (state, action) => ({ ...state, selectData: action.payload }),
  },
});

export const { setResourceData, setColumnNames, setMultiSelectData, setSelectData } = resourceData.actions;
export default resourceData.reducer;
