import api from '../axios/Axios';
import { userAPI } from '../utils/apiEndpoints';

const getUsers = async () => {
  try {
    const {data} = await api.get(userAPI.ALL);
    const {users} = data;
    if (!users) {
      return {
        isError: true,
        errorTitle: 'User fetching error!!!', 
        errorMessage: 'No user can be fetched from the server',
      }
    } else {
      return users;
    }
  } catch (err) {
    const message = err?.response?.data?.message ?? 'Something went wrong. Please try again after some time.';
    return {
      isError: true,
      errorTitle: 'Error!!', 
      errorMessage: message,
    }
  }
};

const editUser = async (id, changes) => {
  try {
    const editedUser = await api.put(userAPI.USER + id, changes);
    if (!editedUser) {
      return {
        isError: true,
        errorTitle: 'Update error!!', 
        errorMessage: 'User cannot be updated',
      }
    } else {
      return { message: 'User updated' , user: editUser };
    }
  } catch (err) {
    const message = err?.response?.data?.message ?? 'Something went wrong. Please try again after some time.';
    return {
      isError: true,
      errorTitle: 'Error!!', 
      errorMessage: message,
    }
  }
};

const deleteUser = async (id) => {
  try {
    const user = await api.delete(userAPI.USER + id);
    if (!user) {
      return {
        isError: true,
        errorTitle: 'Delete employee Failed', 
        errorMessage: 'This employee could not be deleted',
      }
    } else {
      return { message: 'User deleted' , user: editUser };
    }
  } catch (err) {
    const message = err?.response?.data?.message ?? 'Something went wrong. Please try again after some time.';
    return {
      isError: true,
      errorTitle: 'Error!!', 
      errorMessage: message,
    }
  }
};

export {
  deleteUser, editUser, getUsers
};
