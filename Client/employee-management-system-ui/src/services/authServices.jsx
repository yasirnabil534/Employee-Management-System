/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from 'js-cookie';
import api from "../axios/Axios";
import { authAPI } from "../utils/apiEndpoints";
import { token } from "../utils/enums";

const setTokens = (accessToken, refreshToken) => {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
      Cookies.set(token.ACCESS, accessToken);
      Cookies.set(token.REFRESH, refreshToken);
}

const clearTokens = () => {
  delete api.defaults.headers.common['Authorization'];
  Cookies.remove(token.ACCESS);
  Cookies.remove(token.REFRESH);
}

const getAccess = async () => {
  try {
    const accessToken = Cookies.get(token.ACCESS);
    const refreshToken = Cookies.get(token.REFRESH);
    if (accessToken && refreshToken) {
      const tokens = await api.post(authAPI.LOGIN, { refreshToken, type: 'refresh' });
      setTokens(tokens.accessToken, tokens.refreshToken);
      return tokens.user;
    }
  } catch (err) {
    return null;
  }
}

const signIn = async (params) => {
  try {
    const { data } = await api.post(authAPI.LOGIN, { ...params, type: 'email' });
    const { accessToken, refreshToken, user } = data;
    if (!accessToken || !refreshToken) {
      clearTokens();
      return {
        isError: true,
        errorTitle: 'Token not found', 
        errorMessage: 'Featching access token got some problem',
      }
    } else {
      console.log(data);
      setTokens(accessToken, refreshToken);
      return { message: 'Successful login', user };
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
  getAccess,
  signIn,
  signUp
};

