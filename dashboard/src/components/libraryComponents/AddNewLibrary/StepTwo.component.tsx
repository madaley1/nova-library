import { FieldType, fieldTypes } from '@/utils/libraries/templates';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AddNewLibraryContext, useLibraryData } from './AddNewLibraryContext';

type StepTwoProps = {
  continueFunction: () => void;
  goBackFunction: () => void;
  active: boolean;
};

const StepTwo = (props: StepTwoProps) => {
  const [libraryState, setData] = useLibraryData();
  return (
    <AddNewLibraryContext.Consumer>
      {(context) => {
        if (context === null) return <>Something has gone wrong, please reload and try again</>;
        const [state, dispatch] = context;
        let newState = state;

        return (
          <Container sx={{ display: `${props.active ? 'flex' : 'none'}`, flexFlow: 'column nowrap' }}>
            {Object.entries(state.fields)
              .filter((entry) => entry[0] !== 'id')
              .map((field, index) => {
                const [title, type] = field;
                // const InputType = ({ type }: { type: fieldTypes }) => {
                //   if (type === 'string') return <TextField type={type}></TextField>;
                //   else if (type === 'number') return <NumberInput />;
                //   else if (type === 'select' || type === 'multiSelect') return <Select></Select>;
                //   else if (type === 'date') return <DateTimePicker />;
                // };
                // return (
                //   <Box key={title} sx={{ display: 'flex', flexFlow: 'column', marginBottom: '1em' }}>
                //     <FormLabel sx={{ textTransform: 'capitalize' }}>{title}</FormLabel>
                //     <InputType type={type} />
                //   </Box>
                // );
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
                            if (entry === index + 1) return [e.target.value, value];
                            else return [key, value];
                          });
                          newState = { ...newState, fields: Object.fromEntries(fieldEntries) };
                        }}
                      ></TextField>
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'column nowrap', height: '5em', width: '15em' }}>
                      <Select
                        label="Field Type"
                        defaultValue={type}
                        onChange={(e) => {
                          const valueIsFieldType = (value: unknown): value is FieldType => {
                            return fieldTypes.includes(value as FieldType);
                          };
                          if (valueIsFieldType(e.target.value))
                            newState = { ...newState, fields: { ...newState.fields, [title]: e.target.value } };
                        }}
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
