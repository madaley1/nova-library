import { TextField } from '@mui/material';
import { ItemIndexProvider } from './AddItemsToLibrary.component';
import { AddNewItemsToLibrary } from './AddItemsToLibraryContext';
import { FieldProps } from './ItemFieldRouter.component';

export const NumberField = (props: FieldProps) => {
  const { fieldTitle } = props;
  const splitFieldTitle = fieldTitle.split('_');
  const capitalizeTitle = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const title = capitalizeTitle(splitFieldTitle.slice(1, splitFieldTitle.length).join(' '));
  return (
    <ItemIndexProvider.Consumer>
      {(itemIndex) => (
        <AddNewItemsToLibrary.Consumer>
          {(context) => {
            if (context === null) return <>Something has gone wrong, please reload and try again</>;
            const [state, dispatch] = context;
            const { fieldValues } = state;
            const newState = state;
            return (
              <TextField
                type="number"
                label={title}
                value={fieldValues[itemIndex][fieldTitle]}
                onChange={(e) => {
                  newState.fieldValues[itemIndex] = {
                    ...newState.fieldValues[itemIndex],
                    [fieldTitle]: e.target.value,
                  };
                  dispatch({
                    type: 'setSingleFieldValueItem',
                    data: { index: itemIndex, item: newState.fieldValues[itemIndex] },
                  });
                }}
              ></TextField>
            );
          }}
        </AddNewItemsToLibrary.Consumer>
      )}
    </ItemIndexProvider.Consumer>
  );
};
