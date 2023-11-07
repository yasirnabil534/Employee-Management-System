import api from '../axios/Axios';
import { userAPI } from '../utils/apiEndpoints';

const editUser = async (id, changes) => {
  try {
    const editedUser = await api.put(userAPI.USER + id, changes);
    if (!editedUser) {
      return {
        isError: true,
        errorTitle: 'Update error!!', 
        errorMessage: 'User cannot be updated',
      }
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
  editUser
};