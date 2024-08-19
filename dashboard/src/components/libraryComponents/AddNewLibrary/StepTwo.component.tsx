import { FieldType, fieldTypes } from '@/utils/libraries/templates';
import { Box, Button, ButtonGroup, Container, MenuItem, Select, TextField } from '@mui/material';
import { AddNewLibraryContext, useLibraryData, useLibraryFields } from './AddNewLibraryContext';

type StepTwoProps = {
  continueFunction: () => void;
  goBackFunction: () => void;
  active: boolean;
};

const valueIsFieldType = (value: unknown): value is FieldType => fieldTypes.includes(value as FieldType);

const StepTwo = (props: StepTwoProps) => {
  const [libraryState, setData] = useLibraryData();
  const [libraryFields, setFields, addField] = useLibraryFields();

  return (
    <AddNewLibraryContext.Consumer>
      {(context) => {
        if (context === null) return <>Something has gone wrong, please reload and try again</>;
        const [state] = context;
        let newState = state;

        return (
          <Container sx={{ display: `${props.active ? 'flex' : 'none'}`, flexFlow: 'column nowrap' }}>
            {Object.entries(state.fields)
              .filter((entry) => entry[0] !== 'id')
              .map((field, index) => {
                const [title, type] = field;
                return (
                  <Box key={index} sx={{ display: 'flex', flexFlow: 'row nowrap' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        marginRight: '1em',
                        width: '35em',
                        height: '5em',
                      }}
                    >
                      <TextField
                        label="Field Name"
                        defaultValue={title}
                        onChange={(e) => {
                          const fieldEntries = Object.entries(newState.fields).map(([key, value], entry) => {
                            if (entry === index) return [e.target.value, value];
                            else return [key, value];
                          });
                          const fieldEntriesObject = Object.fromEntries(fieldEntries);
                          newState = { ...newState, fields: fieldEntriesObject };
                          // console.log(newState);
                        }}
                        onBlur={() => {
                          // console.log(newState.fields);
                          setFields(newState.fields);
                        }}
                      ></TextField>
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'column nowrap', height: '5em', width: '15em' }}>
                      <Select
                        label="Field Type"
                        defaultValue={type}
                        onChange={(e) => {
                          if (valueIsFieldType(e.target.value))
                            newState = { ...newState, fields: { ...newState.fields, [title]: e.target.value } };
                        }}
                        onBlur={() => setFields(newState.fields)}
                      >
                        {fieldTypes.map((type) => (
                          <MenuItem value={type} key={title + type} sx={{ width: '100%', textTransform: 'capitalize' }}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                );
              })}
            <Button onClick={() => addField()}> Add New Row </Button>
            <ButtonGroup variant="outlined">
              <Button onClick={props.goBackFunction}>Back</Button>
              <Button
                onClick={() => {
                  setData(newState);
                  props.continueFunction();
                }}
              >
                Continue
              </Button>
            </ButtonGroup>
          </Container>
        );
      }}
    </AddNewLibraryContext.Consumer>
  );
};

export default StepTwo;
