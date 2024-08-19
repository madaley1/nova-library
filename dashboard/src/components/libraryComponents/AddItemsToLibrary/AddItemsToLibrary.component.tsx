import Modal from '@/components/Modal';
import { PageIdContextProvider, processColumnNames } from '@/pages/[id]';
import { setResourceData } from '@/resources/resourceData';
import { IRootState } from '@/resources/store';
import { FieldType, isFieldType } from '@/utils/libraries/templates';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { createContext, useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
};

type FieldEntry = {
  name: string;
  type: FieldType;
};

export const ItemIndexProvider = createContext(0);

export const AddNewItemModal = (props: AddNewItemModalProps) => {
  const { open, closeModal } = props;
  const resourceData = useSelector((state: IRootState) => state.resourceData);
  const [columnNames, setColumnNames] = useState<string[]>([]);

  useEffect(() => {
    setColumnNames(processColumnNames(resourceData.columnData));
  }, []);

  const initializeFields = () => {
    const initialFieldData = initialAddItemsToLibraryContextValue;
    initialFieldData.fieldValues[0] = {};
    resourceData.columnData.forEach((column) => {
      if (!isFieldType(column.column_type))
        throw new Error('Something has gone wrong, field type was not found in available options');
      const { column_name, column_type } = column;
      initialFieldData.fields[column_name] = column_type;
      switch (column_type) {
        case 'string' || 'select':
          initialFieldData.fieldValues[0][column_name] = '';
          break;
        case 'number':
          initialFieldData.fieldValues[0][column_name] = 0;
          break;
        case 'date':
          initialFieldData.fieldValues[0][column_name] = undefined;
          break;
        case 'multiSelect':
          initialFieldData.fieldValues[0][column_name] = Array<string>();
      }
    });
    return initialFieldData;
  };

  const BodyContent = () => {
    const initialFieldData = initializeFields();
    const dispatch = useDispatch();

    const [newItemData, setNewItemData] = useState(initialFieldData);

    const [state, dispatchFormData] = useReducer(addItemsToLibraryContextReducer, newItemData);

    const submitNewItems = async (id: string, data: AddItemsToLibraryContextState) => {
      const submissionData = data;
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BROWSER_API_URL}/libraries/${id}/items`,
          submissionData.fieldValues,
        );
        if (response.status !== 200) throw new Error('Something went wrong, please try again');
        setNewItemData({ ...initialFieldData });
        dispatchFormData({ type: 'setContext', data: { ...initialFieldData } });
        const updatedData = structuredClone(resourceData.currentData);
        const dataLength = updatedData.length;
        for (let i = 0; i < submissionData.fieldValues.length; i++) {
          updatedData.push({ id: dataLength + 1, ...submissionData.fieldValues[i] });
        }
        dispatch(setResourceData(updatedData));
        closeModal();
      } catch (err) {
        console.error(err);
      }
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
                    {resourceData.columnData.map((column, index) => {
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
                            <p>
                              {column.column_name} (type: {column.column_type})
                            </p>
                          </Box>
                          <Box sx={{ display: 'flex', flexFlow: 'column nowrap', height: '5em', width: '15em' }}>
                            <ItemFieldRouter
                              fieldTitle={`${column.column_name.split(' ').join('_')}`}
                              type={column.column_type}
                              required={column.column_required === 1}
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
