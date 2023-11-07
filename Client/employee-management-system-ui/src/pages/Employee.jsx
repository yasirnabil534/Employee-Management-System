/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/Contexts';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2007' : '#f5ffff',
  width: 450,
  margin: '15px',
  padding: '15px',
  [theme.breakpoints.down('md')]: {
    margin: '5px',
  },
}));

const StyledTable = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2007' : '#f5ffff',
  margin: '15px',
  [theme.breakpoints.down('md')]: {
    margin: '5px',
  },
}));

const row = [
  { id: 1, lname: 'Snow', fname: 'Jon', age: 35, email:'yasir.nabil5343@gmail.com', phone: '+8801687439951', position: 'Software Enginner' },
  { id: 2, lname: 'Lannister', fname: 'Cersei', age: 42 },
  { id: 3, lname: 'Lannister', fname: 'Jaime', age: 45 },
  { id: 4, lname: 'Stark', fname: 'Arya', age: 16 },
  { id: 5, lname: 'Targaryen', fname: 'Daenerys', age: 12 },
  { id: 6, lname: 'Melisandre', fname: null, age: 150 },
  { id: 7, lname: 'Clifford', fname: 'Ferrara', age: 44 },
  { id: 8, lname: 'Frances', fname: 'Rossini', age: 36 },
  { id: 9, lname: 'Roxie', fname: 'Harvey', age: 65 },
];

const Employee = () => {
  const [columns, setColumns] = useState([
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.fname || ''} ${params.row.lname || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
    },
    {
      field: 'position',
      headerName: 'Position',
      width: 250,
      sortable: true,
    },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [rows, setRows] = useState(row);
  const { user } = useContext(UserContext);
  let ignore = false;
  useEffect(() => {
    console.log('checking user', user);
    if (ignore) {
      return;
    }
    if (Object.keys(user).length > 0 && user.type === 'user' || isNaN('a')===true) {
      setColumns((initColumns) => [...initColumns, {
        field: 'detail',
        headerName: 'Detail',
        width: 160,
        renderCell: (params) => (
          <Button onClick={(e) => {
            e.stopPropagation();
            setModalData(() => ({
              open: true,
              data: params.row,
            }));
          }}>Click to see Details</Button>
        ),
      }]);
    }
    ignore = true;
  },[]);
  const [modalData, setModalData] = useState({
    open: false,
    data: {
      fname: '',
      lname: '',
      email: '',
      age: 0,
      position: '',
      phone: '',
      address: '',
    },
  });

  const resetModal = () => {
    setModalData(() => (
      {
        open: false,
        data: {
          fname: '',
          lname: '',
          email: '',
          age: 0,
          position: '',
          phone: '',
          address: '',
        }
      }
    ));
  };

  // eslint-disable-next-line react/prop-types
  const RenderOptions = ({ show }) => {
    if (!show ) {
      return null;
    }
    else {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </Box>
      )
    }
  };

  return (
    <>
      <Dialog
        open={modalData.open}
        onClose={resetModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <StyledCard>
            <Box>
              <DialogTitle id="modal-modal-title" variant='h4' component='h2'>
                {`${modalData.data.fname} ${modalData.data.lname}${modalData.data.type ?`(${modalData.data.type})` :''}`}
              </DialogTitle>
              <Divider>Details</Divider>
            </Box>
            <DialogContent id="modal-description" sx={{ mx: 2 }}>
              <Typography variant='h6' component='h2'>
                Name: {`${modalData.data.fname} ${modalData.data.lname}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Email: {`${modalData.data.email}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Age: {`${modalData.data.age}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Position: {`${modalData.data.position}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Phone No.: {`${modalData.data.phone}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                Address: {`${modalData.data.address}`}
              </Typography>
              <Typography variant='h6' component='h2'>
                User Type: {`${modalData.data.type}`}
              </Typography>
            </DialogContent>
            <RenderOptions show={ ((Object.keys(user).length === 0)? false: true) } />
            <DialogActions>
              <Button onClick={() => {
                resetModal();
              }} autoFocus>
                Close
              </Button>
            </DialogActions>
          </StyledCard>
        </Box>
      </Dialog>
      <StyledTable>
        <Box sx={{ height: 400, width: '100%' }}>
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
          />
        </Box>
      </StyledTable>
    </>
  );
};

export default Employee;