import { IRootState } from '@/resources/store';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AddNewItemsToLibrary } from './AddItemsToLibraryContext';
import { FieldProps } from './ItemFieldRouter.component';

export const MultiSelectField = (props: FieldProps) => {
  const { fieldTitle } = props;
  const [selectValue, setSelectValue] = useState(Array<string>());
  const splitFieldTitle = fieldTitle.split('_');
  const capitalizeTitle = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const title = capitalizeTitle(splitFieldTitle.slice(1, splitFieldTitle.length).join(' '));
  const multiSelectOptions = useSelector((state: IRootState) => state.resourceData.multiSelectData[fieldTitle]);
  return (
    <AddNewItemsToLibrary.Consumer>
      {(context) => {
        if (context === null) return <>Something has gone wrong, please reload and try again</>;
        const [state, dispatch] = context;
        const newState = state;
        return (
          <Select
            label={title}
            multiple
            defaultValue={Array<string>()}
            value={selectValue}
            onChange={(e) => {
              const { value } = e.target;
              setSelectValue(typeof value === 'string' ? value.split(',') : value);
              newState.fieldValues[fieldTitle] = value;
            }}
            onBlur={(e) => {
              dispatch({ type: 'setFieldValues', data: { fieldValues: newState.fieldValues } });
            }}
          >
            {multiSelectOptions.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        );
      }}
    </AddNewItemsToLibrary.Consumer>
  );
};
