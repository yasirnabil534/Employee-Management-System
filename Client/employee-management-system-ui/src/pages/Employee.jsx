/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ErrorModal from '../components/ErrorModal';
import ShowDetailDialog from '../components/ShowDetailDialog';
import UserTable from '../components/UserTable';
import { UserContext } from '../contexts/Contexts';
import { getUsers } from '../services/userService';

const Employee = () => {
  const [columns, setColumns] = useState([
    { field: 'sl', headerName: 'ID', width: 90 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
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
  const [rows, setRows] = useState([]);
  const [changes, setChanges] = useState(false);
  const { user } = useContext(UserContext);
  const [error, setError] = useState({
    title: '',
    message: '',
    show: false,
  });

  const resetChanges = () => {
    setChanges(() => (!changes));
  }

  const resetError = () => {
    setError(() => ({
      title: '',
      message: '',
      show: false,
    }));
  };

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
  let ignore = false;

  useEffect(() => {
    console.log('rendering employee');
    const fetchData = async () => {
      const users = await getUsers();
      if (users.isError) {
        setError(() => ({
          title: users.errorTitle,
          message: users.errorMessage,
          show: true,
        }));
      } else {
        users.forEach((item, index) => {item.sl = index + 1});
        setRows(() => (users));
        if (!ignore && Object.keys(user).length > 0 && user.type === 'admin' && columns.length <= 5) {
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
          ignore = true;
        }
      }
    }
    fetchData();
  },[changes, user]);

  return (
    <>
      <ErrorModal 
        show={error.show} 
        title={error.title} 
        message={error.message} 
        resetModal={resetError}
      />
      <ShowDetailDialog 
        data={modalData.data}
        open={modalData.open}
        resetModal={resetModal}
        setChanges={resetChanges}
      />
      <UserTable rows={rows} columns={columns} setError={setError} changes={changes} />
    </>
  );
};

export default Employee;