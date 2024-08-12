import { FieldType } from '@/utils/libraries/templates';
import { createSlice } from '@reduxjs/toolkit';

export type ColumnData = {
  column_name: string;
  column_type: FieldType;
  column_required: 0 | 1;
};

const resourceData = createSlice({
  name: 'Resource Data',
  initialState: {
    currentData: Array<Record<string, any>>(),
    columnData: Array<ColumnData>(),
    editModalData: <Record<string, any>>{},
    selectData: <Record<string, string[]>>{},
    multiSelectData: <Record<string, string[]>>{},
  },
  reducers: {
    setResourceData: (state, action) => ({ ...state, currentData: action.payload }),
    setColumnData: (state, action) => ({ ...state, columnData: action.payload }),
    setMultiSelectData: (state, action) => ({ ...state, multiSelectData: action.payload }),
    setSelectData: (state, action) => ({ ...state, selectData: action.payload }),
  },
});

export const { setResourceData, setColumnData, setMultiSelectData, setSelectData } = resourceData.actions;
export default resourceData.reducer;
