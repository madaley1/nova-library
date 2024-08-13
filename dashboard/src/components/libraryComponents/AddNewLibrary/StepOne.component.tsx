// import templates from '@/utils/libraries/templates'
import { IRootState } from '@/resources/store';
import { Button, ButtonGroup, Container, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AddNewLibraryContext, useLibraryData } from './AddNewLibraryContext';
type StepOneProps = {
  continueFunction: () => void;
  active: boolean;
};

const StepOne = (props: StepOneProps) => {
  const formData = useContext(AddNewLibraryContext);
  const availableTemplates = useSelector((state: IRootState) => state.libraryData.templates);
  const [state, setData] = useLibraryData();
  const newState = { ...state };
  return (
    <Container sx={{ display: `${props.active ? 'block' : 'none'}` }}>
      {/* <Typography variant="h5" sx={{ marginBottom: '1em' }}>
        Select Desired Template
      </Typography> */}
      <Container>
        {/* <ButtonGroup sx={{ marginBottom: '1em' }}>
          {formData &&
            availableTemplates.map((template) => {
              return (
                <Button
                  key={template.title}
                  role="button"
                  onClick={() => {
                    setData({
                      title: template.title,
                      fields: template.fields,
                    });
                  }}
                >
                  {template.title} Library
                </Button>
              );
            })}
        </ButtonGroup> */}
        <Typography variant="h5">Library Title:</Typography>
        <TextField
          label="Library Title"
          defaultValue={newState.title}
          onChange={(e) => {
            newState.title = e.target.value;
            // setData({ ...updatedState });
          }}
        ></TextField>
      </Container>
      <Button
        variant="outlined"
        onClick={() => {
          setData({ ...newState });
          // state.title === '' ?
          //   setData({
          //     title: availableTemplates[0].title,
          //     fields: availableTemplates[0].fields,
          //   })
          // : null;
          props.continueFunction();
        }}
      >
        Continue
      </Button>
    </Container>
  );
};

export default StepOne;
