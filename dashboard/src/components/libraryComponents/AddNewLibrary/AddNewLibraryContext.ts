import { isRecord } from '@/utils/isRecord';
import { FieldType, fieldTypes } from '@/utils/libraries/templates';
import type { Dispatch } from 'react';
import { Reducer, createContext, useCallback, useContext } from 'react';

type LibraryColumns = Record<string, { column_type: FieldType; required: boolean }>;

export type AddNewLibraryContextState = {
  library_title: string;
  columns: LibraryColumns;
};

export const initialAddNewLibraryContextValue: AddNewLibraryContextState = {
  library_title: '',
  columns: {} as LibraryColumns,
};

type AddNewLibraryActionTypes = 'setType' | 'setFields' | 'setContext' | 'addField';

type AddNewLibraryAction = {
  type: AddNewLibraryActionTypes;
  data: unknown;
};

const isDataContextState = (data: any): data is AddNewLibraryContextState => {
  try {
    return data?.library_title && data?.columns;
  } catch {
    return false;
  }
};

const isDataFieldList = (data: any): data is LibraryColumns => {
  const entries = Object.entries(data);
  let isValid = true;
  for (const [title, col] of entries) {
    if (!isRecord(col)) {
      isValid = false;
      break;
    }
    if (!Object.keys(col).includes('type') || !Object.keys(col).includes('required')) {
      isValid = false;
      break;
    }
    const { type } = col;
    if (!fieldTypes.some((arr) => arr === `${type}`)) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

export const addNewLibraryReducer: Reducer<AddNewLibraryContextState, AddNewLibraryAction> = (state, action) => {
  switch (action.type) {
    case 'setType':
      if (typeof action.data !== 'string') throw new Error('Please provide a string for setting the library type');
      return { ...state, library_title: action.data };
    case 'setFields':
      if (typeof action.data !== 'object' || !isDataFieldList(action.data))
        throw new Error('Please provide an object with properties ');
      return { ...state, columns: action.data };
    case 'setContext':
      if (isDataContextState(action.data)) return { ...state, ...action.data };
      else throw new Error('Please provide the full state for setting context');
    case 'addField':
      return {
        ...state,
        columns: { ...state.columns, ['']: { column_type: 'string', required: false } },
      };
  }
};

type ContextValue = [AddNewLibraryContextState, Dispatch<AddNewLibraryAction>];

export const AddNewLibraryContext = createContext<ContextValue | null>(null);

export const useLibraryType = () => {
  if (AddNewLibraryContext === null) throw Error('Context not initialized');
  const [state, dispatch] = useContext(AddNewLibraryContext) as ContextValue;
  const setType = useCallback((newType: string) => {
    dispatch({
      type: 'setType',
      data: newType,
    });
  }, []);
  return [state, setType] as const;
};

export const useLibraryFields = () => {
  if (AddNewLibraryContext === null) throw Error('Context not initialized');
  const [state, dispatch] = useContext(AddNewLibraryContext) as ContextValue;
  const setFields = useCallback((newFields: LibraryColumns) => {
    dispatch({
      type: 'setFields',
      data: newFields,
    });
  }, []);
  const addField = useCallback(() => {
    dispatch({
      type: 'addField',
      data: null,
    });
  }, []);
  return [state, setFields, addField] as const;
};

export const useLibraryData = () => {
  if (AddNewLibraryContext === null) throw Error('Context not initialized');
  const [state, dispatch] = useContext(AddNewLibraryContext) as ContextValue;
  const setData = useCallback((newData: AddNewLibraryContextState) => {
    dispatch({
      type: 'setContext',
      data: newData,
    });
  }, []);
  return [state, setData] as const;
};
