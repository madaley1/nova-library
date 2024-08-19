import { FieldType, fieldTypes } from '@/utils/libraries/templates';
import type { Dispatch } from 'react';
import { Reducer, createContext, useCallback, useContext } from 'react';

export type AddNewLibraryContextState = {
  title: string;
  fields: Record<string, FieldType>;
};

export const initialAddNewLibraryContextValue: AddNewLibraryContextState = {
  title: '',
  fields: {} as Record<string, FieldType>,
};

type AddNewLibraryActionTypes = 'setType' | 'setFields' | 'setContext' | 'addField';

type AddNewLibraryAction = {
  type: AddNewLibraryActionTypes;
  data: unknown;
};

const isDataContextState = (data: any): data is AddNewLibraryContextState => {
  try {
    return data?.title && data?.fields;
  } catch {
    return false;
  }
};

const isDataFieldList = (data: any): data is Record<string, FieldType> => {
  const entries = Object.entries(data);
  let isValid = true;
  for (const [title, type] of entries) {
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
      return { ...state, title: action.data };
    case 'setFields':
      if (typeof action.data !== 'object' || !isDataFieldList(action.data))
        throw new Error('Please provide an object with properties ');
      return { ...state, fields: action.data };
    case 'setContext':
      if (isDataContextState(action.data)) return { ...state, ...action.data };
      else throw new Error('Please provide the full state for setting context');
    case 'addField':
      return { ...state, fields: { ...state.fields, newField: 'string' } };
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
  const setFields = useCallback((newFields: Record<string, FieldType>) => {
    dispatch({
      type: 'setFields',
      data: newFields,
    });
  }, []);
  const addField = useCallback(() => {
    console.log(state.fields);
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
