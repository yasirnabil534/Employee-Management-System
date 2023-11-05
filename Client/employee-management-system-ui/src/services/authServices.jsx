/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from 'js-cookie';
import api from "../axios/Axios";
import { authAPI } from "../utils/apiEndpoints"

const clearTokens = () => {
  delete api.defaults.headers.common['Authorization'];
  Cookies.remove('yasirEmsAccessToken');
  Cookies.remove('yasirEmsRefreshToken');
}

const hasAccess = () => {
  return (Boolean(Cookies.get('yasirEmsAccessToken')) && Cookies.get('yasirEmsAccessToken'));
}

const signIn = async (params) => {
  try {
    const { data } = await api.post(authAPI.LOGIN, { ...params, type: 'email' });
    const { accessToken, refreshToken } = data;
    if (!accessToken || !refreshToken) {
      clearTokens();
      return {
        isError: true,
        errorTitle: 'Token not found', 
        errorMessage: 'Featching access token got some problem',
      }
    } else {
      console.log(data);
      api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
      Cookies.set('yasirEmsAccessToken', accessToken);
      Cookies.set('yasirEmsRefreshToken', refreshToken);
      return { message: 'Successful login'};
    }
  } catch (err) {
    console.log(err);
    const message = err?.response?.data?.message ?? 'Something went wrong. Please try again after some time.';
    return {
      isError: true,
      errorTitle: 'Error!!', 
      errorMessage: message,
    }
  }
};

const signUp = async (params) => {
  try {
    const { data } = await api.post(authAPI.SIGNUP, params);
    if (!data) {
      return {
        isError: true,
        errorTitle: 'Registration problem', 
        errorMessage: 'User could not be registered. Please try again.',
      }
    } else {
      console.log('data', data);
      return { message: 'Successful registration', user: data.user };
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
  clearTokens,
  hasAccess, 
  signIn,
  signUp
};

