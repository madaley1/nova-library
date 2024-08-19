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
        const rows = Object.entries(state.fields)
          .filter((entry) => entry[0] !== 'id')
          .map((field) => {
            const [title, type] = field;
            return { id: title, fieldName: title, fieldType: type };
          });
        return (
          <Container sx={{ display: `${props.active ? 'block' : 'none'}` }}>
            <Typography variant="h5" sx={{ marginBottom: '1em', textTransform: 'capitalize' }}>
              Library Name:
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: '1em', textTransform: 'capitalize' }}>
              {state.title}
            </Typography>
            <Box sx={{ display: 'flex', flexFlow: 'column', height: 'max-content' }}>
              <Typography variant="h5" sx={{ marginBottom: '1em', textTransform: 'capitalize' }}>
                Library Fields:
              </Typography>
              {props.active ?
                <DataGrid
                  rows={rows}
                  columns={[
                    {
                      field: 'fieldName',
                      headerName: 'Field Name',
                      minWidth: 250,
                    },
                    {
                      field: 'fieldType',
                      headerName: 'Field Type',
                    },
                  ]}
                  sx={{ minWidth: '45em', marginBottom: '1em' }}
                />
              : <></>}
            </Box>
            <ButtonGroup variant="outlined">
              <Button onClick={props.goBackFunction}>Back</Button>
              <Button
                onClick={async () => {
                  const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/libraries/create`, {
                    method: 'POST',
                    body: JSON.stringify(state),
                  });
                  if (rawResponse.status === 200) window.location.href = `${window.location.origin}/${state.title}`;
                }}
              >
                Submit New Library
              </Button>
            </ButtonGroup>
          </Container>
        );
      }}
    </AddNewLibraryContext.Consumer>
  );
};

export default StepThree;
