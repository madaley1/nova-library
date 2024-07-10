import { isRecord } from '@/utils/isRecord';
import { DateTimeField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AddNewItemsToLibrary.Consumer>
        {(context) => {
          if (context === null) return <>Something has gone wrong, please reload and try again</>;
          const [state, dispatch] = context;
          const { fieldValues } = state;
          let newState = state;
          return (
            <DateTimeField
              label={title}
              defaultValue={fieldValues[fieldTitle] as Dayjs}
              format={'YYYY/MM/DD'}
              onChange={(e, error) => {
                if (!e) return;
                if (e.isValid()) {
                  newState = {
                    ...newState,
                    fieldValues: {
                      ...newState.fieldValues,
                      [fieldTitle]: e.toDate(),
                    },
                  };
                }
              }}
              onBlur={() => {
                dispatch({ type: 'setFieldValues', data: { fieldValues: newState.fieldValues } });
              }}
            ></DateTimeField>
          );
        }}
      </AddNewItemsToLibrary.Consumer>
    </LocalizationProvider>
  );
};
