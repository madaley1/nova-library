import { FieldType } from '@/utils/libraries/templates';
import type { Dispatch } from 'react';
import { Reducer, createContext, useCallback, useContext } from 'react';

export type AddNewLibraryContextState = {
  title: string;
  fields: Record<string, FieldType>;
};

export const initialContextValue: AddNewLibraryContextState = {
  title: '',
  fields: {},
};

type AddNewLibraryActionTypes = 'setType' | 'setFields' | 'setContext';

type AddNewLibraryAction = {
  type: AddNewLibraryActionTypes;
  data: Record<string, any>;
};

export const addNewLibraryReducer: Reducer<AddNewLibraryContextState, AddNewLibraryAction> = (state, action) => {
  switch (action.type) {
    case 'setType':
      return { ...state, title: action.data.value };
    case 'setFields':
      return { ...state, fields: action.data };
    case 'setContext':
      return action.data as AddNewLibraryContextState;
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
      data: { value: newType },
    });
  }, []);
  return [state, setType] as const;
};

export const useLibraryFields = () => {
  if (AddNewLibraryContext === null) throw Error('Context not initialized');
  const [state, dispatch] = useContext(AddNewLibraryContext) as ContextValue;
  const setType = useCallback((newFields: Record<string, FieldType>) => {
    dispatch({
      type: 'setFields',
      data: newFields,
    });
  }, []);
  return [state, setType] as const;
};

export const useLibraryData = () => {
  if (AddNewLibraryContext === null) throw Error('Context not initialized');
  const [state, dispatch] = useContext(AddNewLibraryContext) as ContextValue;
  const setType = useCallback((newData: AddNewLibraryContextState) => {
    console.log(newData);
    dispatch({
      type: 'setContext',
      data: newData,
    });
  }, []);
  return [state, setType] as const;
};
