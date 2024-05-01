import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { log } from 'console';
import { useRouter } from 'next/router';
import { useState } from 'react';

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id);
  const response = await fetch(`${process.env.URL}/api/books`);
  const data = await response.json();
  return {
    props: { data },
  };
}

export default function Index({ data }) {
  const [resourceData, setResourceData] = useState(data);
  // const router = useRouter();
  // const { id } = router.query;
  console.log(data);

  return (
    // <></>
    <DataGrid
      columns={
        data[0] ? Object.keys(data[0]).map((key) => ({ field: key, headerName: key, hideable: key === 'id' })) : []
      }
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
  );
}
