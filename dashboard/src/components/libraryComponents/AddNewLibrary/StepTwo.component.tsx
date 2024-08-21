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
            {Object.entries(state.columns)
              .filter((entry) => entry[0] !== 'id')
              .map((field, index) => {
                const [title, col] = field;
                const { column_type, required } = col;
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
                          // this needs tweaking so that I can set the value to what the user types and it just creates an error state in the ui.
                          const fieldEntries = Object.entries(newState.columns).map(([key, value], entry) => {
                            // if (Object.keys(newState.columns).includes(e.target.value)) {
                            //   console.log('set error');
                            // } else if (entry === index) return [e.target.value, { ...value }];
                            // else return [key, { ...value }];

                            if (entry === index && !Object.keys(newState.columns).includes(e.target.value))
                              return [e.target.value, { ...value }];
                            else return [key, { ...value }];
                          });

                          const fieldEntriesObject = Object.fromEntries(fieldEntries);
                          newState = { ...newState, columns: fieldEntriesObject };
                        }}
                        onBlur={() => {
                          setFields(newState.columns);
                        }}
                      ></TextField>
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'column nowrap', height: '5em', width: '15em' }}>
                      <Select
                        label="Field Type"
                        defaultValue={column_type}
                        onChange={(e) => {
                          if (valueIsFieldType(e.target.value))
                            newState = {
                              ...newState,
                              columns: {
                                ...newState.columns,
                                [title]: { ...newState.columns[title], column_type: e.target.value },
                              },
                            };
                        }}
                        onBlur={() => setFields(newState.columns)}
                      >
                        {fieldTypes.map((type) => (
                          <MenuItem value={type} key={title + type} sx={{ width: '100%', textTransform: 'capitalize' }}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'column nowrap', height: '5em', width: '15em' }}>
                      <Select
                        label="Required"
                        defaultValue={required ? 'True' : 'False'}
                        onChange={(e) => {
                          newState = {
                            ...newState,
                            columns: {
                              ...newState.columns,
                              [title]: {
                                ...newState.columns[title],
                                required: e.target.value === 'True' ? true : false,
                              },
                            },
                          };
                        }}
                        onBlur={() => setFields(newState.columns)}
                      >
                        <MenuItem value={'True'} sx={{ width: '100%', textTransform: 'capitalize' }}>
                          True
                        </MenuItem>
                        <MenuItem value={'False'} sx={{ width: '100%', textTransform: 'capitalize' }}>
                          False
                        </MenuItem>
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
