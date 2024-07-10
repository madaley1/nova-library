import { IRootState } from '@/resources/store';
import { MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';
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
    <AddNewItemsToLibrary.Consumer>
      {(context) => {
        if (context === null) return <>Something has gone wrong, please reload and try again</>;
        const [state, dispatch] = context;
        const newState = state;
        return (
          <Select
            label={title}
            onChange={(e) => {
              newState.fieldValues[fieldTitle] = e.target.value;
            }}
            onBlur={(e) => {
              dispatch({ type: 'setFieldValues', data: { fieldValues: newState.fieldValues } });
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
  );
};
