import Modal from '@/components/Modal';
import { FieldType, isFieldType } from '@/utils/libraries/templates';
import { Box, Button, Container } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import {
  addItemsToLibraryContextReducer,
  AddNewItemsToLibrary,
  initialAddItemsToLibraryContextValue,
} from './AddItemsToLibraryContext';
import { ItemFieldRouter } from './ItemFieldRouter.component';

type AddNewItemModalProps = {
  open: boolean;
  closeModal: () => void;
  columnNames: string[];
};

type FieldEntry = {
  name: string;
  type: FieldType;
};

export const AddNewItemModal = (props: AddNewItemModalProps) => {
  const { columnNames, open, closeModal } = props;
  // const [newItemData, setNewItemData] = useState<Record<string, any>>();
  const [formattedColumnNames, setFormattedColumnNames] = useState(Array<FieldEntry>());

  useEffect(() => {
    const extractedNamesAndTypes = [...columnNames].filter((item) => item !== 'id').map((item) => item.split('_'));

    const formattedFieldTypes = extractedNamesAndTypes.map((arr) => {
      const temp = [...arr];
      temp.shift();

      if (!isFieldType(arr[0])) throw new Error('fieldtype not found');
      return {
        name: temp.join(' '),
        type: arr[0],
      };
    });
    setFormattedColumnNames(formattedFieldTypes);
  }, [columnNames]);

  const submitNewItems = () => {};

  const BodyContent = () => {
    const initialFieldData = initialAddItemsToLibraryContextValue;
    columnNames.forEach((value) => {
      if (value === 'id') return;
      const columnType = value.split('_')[0];
      if (!isFieldType(columnType))
        throw new Error('Something has gone wrong, field type was not found in available options');
      initialFieldData.fields[value] = columnType;
      switch (columnType) {
        case 'string' || 'select':
          initialFieldData.fieldValues[value] = '';
          break;
        case 'number':
          initialFieldData.fieldValues[value] = 0;
          break;
        case 'date':
          initialFieldData.fieldValues[value] = undefined;
          break;
        case 'multiSelect':
          initialFieldData.fieldValues[value] = Array<string>();
      }
    });
    const [state, dispatchFormData] = useReducer(addItemsToLibraryContextReducer, initialAddItemsToLibraryContextValue);
    return (
      <AddNewItemsToLibrary.Provider value={[state, dispatchFormData]}>
        <Container sx={{ display: 'flex', flexFlow: 'column nowrap' }}>
          {formattedColumnNames.map((column, index) => {
            return (
              <Box key={index} sx={{ display: 'flex', flexFlow: 'row nowrap' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    marginRight: '1em',
                    width: '35em',
                    height: '5em',
                    textTransform: 'capitalize',
                  }}
                >
                  <p>{column.name}</p>
                </Box>
                <Box sx={{ display: 'flex', flexFlow: 'column nowrap', height: '5em', width: '15em' }}>
                  <ItemFieldRouter
                    fieldTitle={`${column.type}_${column.name.split(' ').join('_')}`}
                    type={column.type}
                  />
                </Box>
              </Box>
            );
          })}
          <Button>Submit New Item(s)</Button>
        </Container>
      </AddNewItemsToLibrary.Provider>
    );
  };

  return <Modal open={open} bodyContent={<BodyContent />} closeModal={closeModal} />;
};
