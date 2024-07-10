import { TextField } from '@mui/material';
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
    <AddNewItemsToLibrary.Consumer>
      {(context) => {
        if (context === null) return <>Something has gone wrong, please reload and try again</>;
        const [state, dispatch] = context;
        const { fieldValues } = state;
        let newState = state;
        return (
          <TextField
            type="number"
            label={title}
            defaultValue={fieldValues[fieldTitle]}
            onChange={(e) => {
              newState = {
                ...newState,
                fieldValues: {
                  ...newState.fieldValues,
                  [fieldTitle]: e.target.value,
                },
              };
            }}
            onBlur={() => {
              dispatch({ type: 'setFieldValues', data: { fieldValues: newState.fieldValues } });
            }}
          ></TextField>
        );
      }}
    </AddNewItemsToLibrary.Consumer>
  );
};
