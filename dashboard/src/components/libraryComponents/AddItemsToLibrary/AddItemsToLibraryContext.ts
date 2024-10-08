import { isRecord } from '@/utils/isRecord';
import { FieldType, fieldTypes } from '@/utils/libraries/templates';
import type { Dispatch } from 'react';
import { Reducer, createContext } from 'react';

export type AddItemsToLibraryContextState = {
  fields: Record<string, FieldType>;
  fieldValues: Record<string, unknown>[];
};

export const initialAddItemsToLibraryContextValue: AddItemsToLibraryContextState = {
  fields: {},
  fieldValues: [],
};

type AddItemsToLibraryActionTypes = 'setContext' | 'setFields' | 'setFieldValues' | 'setSingleFieldValueItem';
type AddItemsToLibraryAction = {
  type: AddItemsToLibraryActionTypes;
  data: Record<string, unknown>;
};

const dataIsContextState = (
  state: AddItemsToLibraryContextState,
  data: unknown,
): data is AddItemsToLibraryContextState => {
  if (!isRecord(data)) return false;
  const stateKeys = Object.keys(state);
  for (const key of Object.keys(data)) if (!stateKeys.includes(key)) return false;
  return true;
};

const dataIsFields = (data: unknown): data is Omit<AddItemsToLibraryContextState, 'fieldValues'> => {
  if (!isRecord(data)) return false;
  if (!('fields' in data) || typeof data.fields !== 'object' || !data.fields) return false;

  const values = Object.values(data.fields);
  return values.filter((value) => fieldTypes.includes(value)).length === values.length;
};

const dataIsFieldValues = (
  state: AddItemsToLibraryContextState,
  data: unknown,
): data is Omit<AddItemsToLibraryContextState, 'fields'> => {
  if (!isRecord(data)) return false;
  if (
    !('fieldValues' in data) ||
    typeof data.fieldValues !== 'object' ||
    !data.fieldValues ||
    !Array.isArray(data.fieldValues)
  )
    return false;
  const stateKeys = Object.keys(state.fields);
  let dataValid = true;
  data.fieldValues.forEach(([item, index]) => {
    const dataKeys = Object.keys(item);
    if (dataKeys.length !== stateKeys.length) dataValid = false;
    let arraysMatch = true;
    for (const value of dataKeys) {
      if (!stateKeys.includes(value)) {
        arraysMatch = false;
      }
    }
    if (!arraysMatch) dataValid = false;
  });

  return dataValid;
};

export const addItemsToLibraryContextReducer: Reducer<AddItemsToLibraryContextState, AddItemsToLibraryAction> = (
  state,
  action,
) => {
  const { data } = action;
  switch (action.type) {
    case 'setContext':
      if (dataIsContextState(state, data)) {
        return { ...state, ...data };
      } else {
        throw new Error('Error setting context - please pass in an object with keys "fields" and "fieldValues"');
      }
    case 'setFields':
      if (dataIsFields(data)) return { ...state, fields: data.fields };
      else {
        throw new Error('Error setting fields - please pass in an object with the "fields" key.');
      }
    case 'setFieldValues':
      if (dataIsFieldValues(state, data)) return { ...state, fieldValues: data.fieldValues };
      else {
        throw new Error('Error setting fieldValues - please pass in an object with the "fieldValues" key.');
      }
    case 'setSingleFieldValueItem':
      return {
        ...state,
        fieldValues: state.fieldValues.map((item, index) => {
          if (index === data.index) {
            if (!isRecord(data.item)) throw new Error('please supply a valid item');
            return { ...item, ...data.item };
          } else return { ...item };
        }),
      };
  }
};

type ContextValue = [AddItemsToLibraryContextState, Dispatch<AddItemsToLibraryAction>];

export const AddNewItemsToLibrary = createContext<ContextValue | null>(null);
