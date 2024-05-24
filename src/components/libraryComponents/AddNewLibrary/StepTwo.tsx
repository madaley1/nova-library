import { fieldTypes } from '@/utils/libraries/templates';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
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
import { AddNewLibraryContext } from './AddNewLibraryContext';

type StepTwoProps = {
  continueFunction: () => void;
  goBackFunction: () => void;
  active: boolean;
};

const StepTwo = (props: StepTwoProps) => {
  return (
    <AddNewLibraryContext.Consumer>
      {(value) => {
        if (value === null) return <>Something has gone wrong, please reload and try again</>;
        const [state, dispatch] = value;
        return (
          <Container sx={{ display: `${props.active ? 'flex' : 'none'}`, flexFlow: 'column nowrap' }}>
            <FormControl>
              {Object.entries(state.fields)
                .filter((entry) => entry[0] !== 'id')
                .map((field) => {
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
                    <Box key="title" sx={{ display: 'flex', flexFlow: 'row nowrap' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexFlow: 'column nowrap',
                          marginRight: '1em',
                          width: '35em',
                          height: '5em',
                        }}
                      >
                        <TextField label="Field Name" value={title}></TextField>
                      </Box>
                      <Box sx={{ display: 'flex', flexFlow: 'column nowrap', height: '5em', width: '15em' }}>
                        <Select label="Field Type" value={type}>
                          {fieldTypes.map((type) => (
                            <MenuItem value={type} key={type} sx={{ width: '100%', textTransform: 'capitalize' }}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </Box>
                  );
                })}
            </FormControl>
            <ButtonGroup variant="outlined">
              <Button onClick={props.goBackFunction}>Back</Button>
              <Button onClick={props.continueFunction}>Continue</Button>
            </ButtonGroup>
          </Container>
        );
      }}
    </AddNewLibraryContext.Consumer>
  );
};

export default StepTwo;
