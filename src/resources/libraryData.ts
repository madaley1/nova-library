import { libraryTemplate } from '@/utils/libraries/templates';
import { createSlice } from '@reduxjs/toolkit';

const resourceData = createSlice({
  name: 'Resource Data',
  initialState: {
    templates: Array<libraryTemplate>(),
  },
  reducers: {
    setTemplates: (state, action) => ({ ...state, templates: action.payload }),
    addTemplate: (state, action) => ({ ...state, templates: [...state.templates, action.payload] }),
  },
});

export const { setTemplates } = resourceData.actions;
export default resourceData.reducer;
