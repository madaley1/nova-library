import { IRootState } from '@/resources/store';
import { MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';
import { ItemIndexProvider } from './AddItemsToLibrary.component';
import { AddNewItemsToLibrary } from './AddItemsToLibraryContext';
import { FieldProps } from './ItemFieldRouter.component';

export const SelectField = (props: FieldProps) => {
  const { fieldTitle } = props;
  const splitFieldTitle = fieldTitle.split('_');
  const capitalizeTitle = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const title = capitalizeTitle(splitFieldTitle.slice(1, splitFieldTitle.length).join(' '));
  const selectOptions = useSelector((state: IRootState) => state.resourceData.selectData[fieldTitle]);
  return (
    <ItemIndexProvider.Consumer>
      {(itemIndex) => (
        <AddNewItemsToLibrary.Consumer>
          {(context) => {
            if (context === null) return <>Something has gone wrong, please reload and try again</>;
            const [state, dispatch] = context;
            const newState = state;
            return (
              <Select
                label={title}
                onChange={(e) => {
                  newState.fieldValues[itemIndex][fieldTitle] = e.target.value;
                  dispatch({
                    type: 'setSingleFieldValueItem',
                    data: { index: itemIndex, item: newState.fieldValues[itemIndex] },
                  });
                }}
              >
                {selectOptions.map((item, index) => (
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
