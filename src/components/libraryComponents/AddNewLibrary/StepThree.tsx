import { Box, Button, ButtonGroup, Container, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AddNewLibraryContext } from './AddNewLibraryContext';

type StepThreeProps = {
  active: boolean;
  goBackFunction: () => void;
};

const StepThree = (props: StepThreeProps) => {
  return (
    <AddNewLibraryContext.Consumer>
      {(value) => {
        if (value === null) return <>Something has gone wrong, please reload and try again</>;
        const [state, dispatch] = value;
        console.log(state.fields);
        const rows = Object.entries(state.fields)
          .filter((entry) => entry[0] !== 'id')
          .map((field) => {
            const [title, type] = field;
            return { id: title, fieldName: title, fieldType: type };
          });
        return (
          <Container sx={{ display: `${props.active ? 'block' : 'none'}` }}>
            <Typography variant="h5" sx={{ marginBottom: '1em', textTransform: 'capitalize' }}>
              Library Name: <br />
              {state.libraryType}
            </Typography>
            <Box sx={{ display: 'flex', flexFlow: 'column' }}>
              <Typography variant="h5" sx={{ marginBottom: '1em', textTransform: 'capitalize' }}>
                Library Fields:
              </Typography>
              <DataGrid
                rows={rows}
                columns={[
                  {
                    field: 'fieldName',
                    headerName: 'Field Name',
                  },
                  {
                    field: 'fieldType',
                    headerName: 'Field Type',
                  },
                ]}
              />
              ;
            </Box>
            <ButtonGroup variant="outlined">
              <Button onClick={props.goBackFunction}>Back</Button>
              <Button>Submit New Library</Button>
            </ButtonGroup>
          </Container>
        );
      }}
    </AddNewLibraryContext.Consumer>
  );
};

export default StepThree;
