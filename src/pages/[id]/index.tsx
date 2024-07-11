import AddNewItemModal from '@/components/libraryComponents/AddItemsToLibrary';
import { EditRowModal } from '@/components/libraryComponents/EditRow.component';
import { setColumnNames, setMultiSelectData, setResourceData, setSelectData } from '@/resources/resourceData';
import { IRootState } from '@/resources/store';
import { parseMultiSelect } from '@/utils/libraries/multiSelect';
import { Button, Grid } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { NextPageContext } from 'next';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${id}`);
  const data = await response.json();
  return {
    props: { data, id },
  };
}

export const PageIdContextProvider = createContext('');

export default function Index({ data, id }: Record<string, any>) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addNewItemModalOpen, setAddNewItemModalOpen] = useState(false);
  const resourceData = useSelector((state: IRootState) => state.resourceData);
  const dispatch = useDispatch();

  const openAddNewItemModal = () => setAddNewItemModalOpen(true);
  const closeAddNewItemModal = () => setAddNewItemModalOpen(false);

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

  const getMultiSelectValues = (resourceData: any) => {
    const multiSelectFields = resourceData.columnNames.filter((column: string) => column.startsWith('multiSelect'));
    const multiSelectData: Record<string, string[]> = {};
    for (const field of multiSelectFields) {
      const allMultiSelectArrays = resourceData.currentData.map((item: Record<string, any>) => {
        return item[field] === '' ? [] : parseMultiSelect(item[field]);
      });
      multiSelectData[field] = [...new Set<string>(allMultiSelectArrays.flatMap((arr: string[]) => arr))];
    }
    return multiSelectData;
  };
  const getSelectValues = (resourceData: any) => {
    const selectFields = resourceData.columnNames.filter((column: string) => column.startsWith('select'));
    const selectData: Record<string, string[]> = {};
    for (const field of selectFields) {
      const allSelectArrays = resourceData.currentData.map((item: Record<string, any>) => {
        return item[field];
      });
      selectData[field] = [...new Set<string>(...allSelectArrays)];
    }
    return selectData;
  };

  useEffect(() => {
    dispatch(setResourceData(data.currentData));
    dispatch(setColumnNames(data.columnNames));
  }, []);
  useEffect(() => {
    if (resourceData.currentData.length > 0) {
      dispatch(setMultiSelectData(getMultiSelectValues(resourceData)));
      dispatch(setSelectData(getSelectValues(resourceData)));
    }
  }, [resourceData.currentData]);

  return (
    <PageIdContextProvider.Provider value={id}>
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
          <Button onClick={openAddNewItemModal}>Add New Item</Button>
        </Grid>
        <Grid item>
          <Button>Delete Selected</Button>
        </Grid>
        <Grid item>
          <Button>Delete All</Button>
        </Grid>
      </Grid>
      <AddNewItemModal
        open={addNewItemModalOpen}
        closeModal={closeAddNewItemModal}
        columnNames={resourceData.columnNames}
      />
      <EditRowModal open={editModalOpen} closeModal={closeEditModal} />
    </PageIdContextProvider.Provider>
  );
}
