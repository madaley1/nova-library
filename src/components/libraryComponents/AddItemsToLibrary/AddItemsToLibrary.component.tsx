import Modal from '@/components/Modal';
import { FieldType, isFieldType } from '@/utils/libraries/templates';
import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
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

  const BodyContent = () => {
    const newItemData = {};
    return (
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
                <ItemFieldRouter type={column.type} />
              </Box>
            </Box>
          );
        })}
      </Container>
    );
  };

  return <Modal open={open} bodyContent={<BodyContent />} closeModal={closeModal} />;
};
