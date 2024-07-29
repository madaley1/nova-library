import { DateTimeField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { ItemIndexProvider } from './AddItemsToLibrary.component';
import { AddNewItemsToLibrary } from './AddItemsToLibraryContext';
import { FieldProps } from './ItemFieldRouter.component';

export const DateField = (props: FieldProps) => {
  const { fieldTitle } = props;
  const splitFieldTitle = fieldTitle.split('_');
  const capitalizeTitle = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const title = capitalizeTitle(splitFieldTitle.slice(1, splitFieldTitle.length).join(' '));
  return (
    <ItemIndexProvider.Consumer>
      {(itemIndex) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AddNewItemsToLibrary.Consumer>
            {(context) => {
              if (context === null) return <>Something has gone wrong, please reload and try again</>;
              const [state, dispatch] = context;
              const { fieldValues } = state;
              const newState = state;
              return (
                <DateTimeField
                  label={title}
                  value={fieldValues[itemIndex][fieldTitle] as Dayjs}
                  format={'YYYY/MM/DD'}
                  onChange={(e, error) => {
                    if (!e) return;
                    if (e.isValid()) {
                      newState.fieldValues[itemIndex] = {
                        ...newState.fieldValues[itemIndex],
                        [fieldTitle]: e.toDate(),
                      };
                      dispatch({
                        type: 'setSingleFieldValueItem',
                        data: { index: itemIndex, item: newState.fieldValues[itemIndex] },
                      });
                    }
                  }}
                ></DateTimeField>
              );
            }}
          </AddNewItemsToLibrary.Consumer>
        </LocalizationProvider>
      )}
    </ItemIndexProvider.Consumer>
  );
};
