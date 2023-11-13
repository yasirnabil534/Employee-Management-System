/* eslint-disable react/prop-types */
import {
  Box,
  Card,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

const StyledTable = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2007' : '#f5ffff',
  margin: '15px',
  [theme.breakpoints.down('md')]: {
    margin: '5px',
  },
}));

const UserTable = (props) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setColumns(() => (props.columns));
    setRows(() => (props.rows));
  }, [props.columns, props.rows, props.changes]);

  return (
    <>
      <StyledTable>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            getRowId={(row) => row._id}
          />
        </Box>
      </StyledTable>
    </>
  );
};

export default UserTable;