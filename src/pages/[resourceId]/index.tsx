import { EditRowModal } from '@/components/libraryComponents/EditRow';
import { setResourceData } from '@/resources/resourceData';
import store from '@/resources/store';
import { Button, Grid } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { NextPageContext } from 'next';
import React, { useState } from 'react';

export async function getServerSideProps(context: NextPageContext) {
  const { resourceId } = context.query;
  const response = await fetch(`${process.env.URL}/api/${resourceId}`);
  const data = await response.json();
  store.dispatch(setResourceData(data));
  return {
    props: { data },
  };
}

export default function Index({ data }: Record<string, any>) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = () => {
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const columns: GridColDef[] =
    data[0] ? Object.keys(data[0]).map((key) => ({ field: key, headerName: key, hideable: key === 'id' })) : [];
  columns.push({
    field: 'edit',
    headerName: 'edit',
    hideable: false,
    renderCell: (params: GridCellParams) => {
      const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log(e, params);
        openEditModal();
      };
      return (
        <>
          <Button onClick={onClick}>Edit</Button>
        </>
      );
    },
  });

  return (
    <>
      <DataGrid
        columns={columns}
        rows={data}
        slots={{
          toolbar: GridToolbar,
        }}
        checkboxSelection
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
      />
      <Grid container sx={{ display: 'flex', flexDirection: 'row wrap', marginTop: '1em' }}>
        <Grid item>
          <Button>Add New Item</Button>
        </Grid>
        <Grid item>
          <Button>Delete Selected</Button>
        </Grid>
        <Grid item>
          <Button>Delete All</Button>
        </Grid>
      </Grid>
      <EditRowModal open={editModalOpen} closeModal={closeEditModal} />
    </>
  );
}
