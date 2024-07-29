import Modal from '@/components/Modal';
import { PageIdContextProvider } from '@/pages/[id]';
import { FieldType, isFieldType } from '@/utils/libraries/templates';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { createContext, useEffect, useReducer, useState } from 'react';
import {
  addItemsToLibraryContextReducer,
  AddItemsToLibraryContextState,
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

export const ItemIndexProvider = createContext(0);

export const AddNewItemModal = (props: AddNewItemModalProps) => {
  const { columnNames, open, closeModal } = props;
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

  const BodyContent = () => {
    const initialFieldData = initialAddItemsToLibraryContextValue;
    initialFieldData.fieldValues[0] = {};
    columnNames.forEach((value) => {
      if (value === 'id') return;
      const columnType = value.split('_')[0];
      if (!isFieldType(columnType))
        throw new Error('Something has gone wrong, field type was not found in available options');
      initialFieldData.fields[value] = columnType;
      switch (columnType) {
        case 'string' || 'select':
          initialFieldData.fieldValues[0][value] = '';
          break;
        case 'number':
          initialFieldData.fieldValues[0][value] = 0;
          break;
        case 'date':
          initialFieldData.fieldValues[0][value] = undefined;
          break;
        case 'multiSelect':
          initialFieldData.fieldValues[0][value] = Array<string>();
      }
    });

    const [newItemData, setNewItemData] = useState(initialFieldData);

    const [state, dispatchFormData] = useReducer(addItemsToLibraryContextReducer, newItemData);

    const submitNewItems = (id: string, data: AddItemsToLibraryContextState) => {
      const submissionData = data;
      axios.post(`${process.env.NEXT_PUBLIC_URL}/api/${id}`, submissionData);
    };
    const addAnotherItem = () => {
      const currentData = state;
      currentData.fieldValues.push(initialFieldData.fieldValues[0]);
      setNewItemData({ ...currentData });
    };
    const removeItem = (indexToRemove: number) => {
      const currentData = state;
      currentData.fieldValues.splice(indexToRemove, 1);
      setNewItemData({ ...currentData });
    };
    return (
      <PageIdContextProvider.Consumer>
        {(id) => {
          return (
            <AddNewItemsToLibrary.Provider value={[state, dispatchFormData]}>
              <Container sx={{ display: 'flex', flexFlow: 'column nowrap' }}>
                {newItemData.fieldValues.map((item, index) => (
                  <ItemIndexProvider.Provider key={index} value={index}>
                    <Box
                      sx={{
                        borderBottom: '1px solid #ffffff75',
                        marginBottom: '.25em',
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="h4">Item {index + 1}</Typography>
                      <Button
                        disabled={newItemData.fieldValues.length <= 1}
                        onClick={() => {
                          removeItem(index);
                        }}
                        sx={{ fontSize: '16px' }}
                      >
                        Remove Item
                      </Button>
                    </Box>
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
                  </ItemIndexProvider.Provider>
                ))}
                <Button onClick={addAnotherItem}>Create Another Item to Add</Button>
                <Button
                  onClick={() => {
                    submitNewItems(id, state);
                  }}
                >
                  Submit New Item(s)
                </Button>
              </Container>
            </AddNewItemsToLibrary.Provider>
          );
        }}
      </PageIdContextProvider.Consumer>
    );
  };

  return <Modal open={open} bodyContent={<BodyContent />} closeModal={closeModal} />;
};
