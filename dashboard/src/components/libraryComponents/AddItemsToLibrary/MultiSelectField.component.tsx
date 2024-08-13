import { IRootState } from '@/resources/store';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemIndexProvider } from './AddItemsToLibrary.component';
import { AddNewItemsToLibrary } from './AddItemsToLibraryContext';
import { FieldProps } from './ItemFieldRouter.component';

export const MultiSelectField = (props: FieldProps) => {
  const { fieldTitle, required } = props;
  const [selectValue, setSelectValue] = useState(Array<string>());
  const splitFieldTitle = fieldTitle.split('_');
  const capitalizeTitle = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const title = capitalizeTitle(splitFieldTitle.slice(1, splitFieldTitle.length).join(' '));
  const multiSelectOptions = useSelector((state: IRootState) => state.resourceData.multiSelectData[fieldTitle]);
  return (
    <ItemIndexProvider.Consumer>
      {(itemIndex) => (
        <AddNewItemsToLibrary.Consumer>
          {(context) => {
            if (context === null) return <>Something has gone wrong, please reload and try again</>;
            const [state, dispatch] = context;
            const newState = state;
            const { fieldValues } = state;
            return (
              <Select
                label={title}
                multiple
                defaultValue={Array<string>()}
                value={selectValue}
                required={required}
                onChange={(e) => {
                  const { value } = e.target;
                  setSelectValue(typeof value === 'string' ? value.split(',') : value);
                  newState.fieldValues[itemIndex][fieldTitle] = value;
                  dispatch({
                    type: 'setSingleFieldValueItem',
                    data: { index: itemIndex, item: newState.fieldValues[itemIndex] },
                  });
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
      )}
    </ItemIndexProvider.Consumer>
  );
};
