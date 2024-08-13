import AddNewItemModal from '@/components/libraryComponents/AddItemsToLibrary';
import { EditRowModal } from '@/components/libraryComponents/EditRow.component';
import { setColumnData, setMultiSelectData, setResourceData, setSelectData } from '@/resources/resourceData';
import { IRootState } from '@/resources/store';
import { parseMultiSelect } from '@/utils/libraries/multiSelect';
import { FieldType } from '@/utils/libraries/templates';
import { Button, Grid } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { NextPageContext } from 'next';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  // Needs to be fixed post-api update
  const response = await axios.get(`${process.env.NEXT_PUBLIC_SSR_API_URL}/libraries/${id}`);
  const { data } = response;
  return {
    props: { data, id },
  };
}

export const PageIdContextProvider = createContext('');

type ColumnData = {
  column_name: string;
  column_type: FieldType;
  column_required: 0 | 1;
};
export const processColumnNames = (columnData: ColumnData[]) => {
  const columnNames = columnData.map((column) => column.column_name);
  columnNames.unshift('id');
  return columnNames;
};

const processRows = (columns: Array<string>, data: Array<Array<any>>) => {
  return data.map((item) => {
    const row: Record<string, any> = {};
    for (let i = 0; i < columns.length; i++) {
      row[columns[i]] = item[i];
    }
    return row;
  });
};

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
    resourceData.columnData ?
      resourceData.columnData.map((column: ColumnData) => {
        const splitName = column.column_name.split('_');
        return {
          field: column.column_name,
          headerName: splitName.length > 1 ? splitName.splice(1).join(' ') : column.column_name,
          hideable: column.column_name === 'id',
        };
      })
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
    const columnNames = processColumnNames(data.column_data);
    const rows = processRows(columnNames, data.data);
    dispatch(setColumnData(data.column_data));
    dispatch(setResourceData(rows));
  }, []);

  return (
    <PageIdContextProvider.Provider value={id}>
      {resourceData.columnData ?
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
      <AddNewItemModal open={addNewItemModalOpen} closeModal={closeAddNewItemModal} />
      <EditRowModal open={editModalOpen} closeModal={closeEditModal} />
    </PageIdContextProvider.Provider>
  );
}
