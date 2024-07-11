import { TextField } from '@mui/material';
import { ItemIndexProvider } from './AddItemsToLibrary.component';
import { AddNewItemsToLibrary } from './AddItemsToLibraryContext';
import { FieldProps } from './ItemFieldRouter.component';

export const StringField = (props: FieldProps) => {
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
            const newState = { ...state };
            return (
              <TextField
                label={title}
                value={newState.fieldValues[itemIndex][fieldTitle]}
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
