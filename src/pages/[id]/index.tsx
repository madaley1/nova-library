import { EditRowModal } from '@/components/libraryComponents/EditRow';
import { setResourceData } from '@/resources/resourceData';
import store from '@/resources/store';
import { Button, Grid } from '@mui/material';
import { idID } from '@mui/material/locale';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${id}`);
  const data = await response.json();
  store.dispatch(setResourceData(data));
  return {
    props: { data },
  };
}

export default function Index({ data }: Record<string, any>) {
  const [currentData, setCurrentData] = useState(data);
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
    headerName: 'Edit',
    hideable: false,
    renderCell: (params: GridCellParams) => {
      const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        openEditModal();
      };
      return (
        <>
          <Button onClick={onClick}>Edit</Button>
        </>
      );
    },
  });

  useEffect(() => {
    const addIds = () => {
      columns.unshift({ field: 'id', headerName: 'id', hideable: true });
      const tempData = currentData.map((row: Record<string, any>, i: number) => ({ ...row, id: i }));
      setCurrentData(tempData);
    };

    !columns.find((col) => col.field === 'id') ? addIds() : null;
  }, []);
  return (
    <>
      {typeof currentData[0]?.id === 'number' ?
        <DataGrid
          columns={columns}
          rows={currentData}
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
      : <>Loading...</>}

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
