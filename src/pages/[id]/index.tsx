import { EditRowModal } from '@/components/libraryComponents/EditRow.component';
import { setColumnNames, setResourceData } from '@/resources/resourceData';
import { IRootState } from '@/resources/store';
import { Button, Grid } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${id}`);
  const data = await response.json();
  return {
    props: { data },
  };
}

export default function Index({ data }: Record<string, any>) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const resourceData = useSelector((state: IRootState) => state.resourceData);
  const dispatch = useDispatch();

  const openEditModal = () => {
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const columns: GridColDef[] =
    resourceData.columnNames ?
      resourceData.columnNames.map((column: string) => ({
        field: column,
        headerName: column.split('_').splice(1).join(' '),
        hideable: column === 'id',
      }))
    : [];
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
    dispatch(setResourceData(data.currentData));
    dispatch(setColumnNames(data.columnNames));
  }, []);
  return (
    <>
      {resourceData.columnNames ?
        <DataGrid
          columns={columns}
          rows={resourceData.currentData}
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
