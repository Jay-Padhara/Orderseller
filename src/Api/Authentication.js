import {
  loginfailed,
  loginsuccess,
  loginuser,
} from '../Redux/Reducers/Authentication/loginreducer';

import {
  registeruser,
  registersuccess,
  registerfailed,
} from '../Redux/Reducers/Authentication/registerreducer';

import {
  forgotpassword,
  forgotpasswordfailed,
  forgotpasswordsuccess,
} from '../Redux/Reducers/Authentication/forgotpassreducer';

import {
  resendemail,
  resendemailfailed,
  resendemailsuccess,
} from '../Redux/Reducers/Authentication/resendreducer';

import {
  changepassword,
  changepasswordfailed,
  changepasswordsuccess,
} from '../Redux/Reducers/Authentication/changepasswordreducer';

import {URLS} from './apiConstants';
import Api from './index';

export const login = async (dispatch, data) => {
  try {
    dispatch(loginuser());
    const response = await Api.post(URLS.LOGIN, data);
    console.log(response);

    if (response?.error) {
      dispatch(loginfailed(response?.message));
    } else {
      dispatch(loginsuccess(response));
    }
    return response;
  } catch (error) {
    dispatch(loginfailed(error));
    return error;
  }
};

export const register = async (data, dispatch) => {
  try {
    dispatch(registeruser());
    const response = await Api.post(URLS.REGISTER, data);
    console.log(response);

    if (response?.error) {
      dispatch(registerfailed(response?.message));
    } else {
      dispatch(registersuccess(response));
    }
    return response;
  } catch (error) {
    dispatch(registerfailed(error));
    return error;
  }
};

export const forgotpass = async (dispatch, data) => {
  try {
    dispatch(forgotpassword());
    const response = await Api.post(URLS.FORGOTPASSWORD, data);
    console.log(response);

    if (response?.error) {
      dispatch(forgotpasswordfailed(response?.message));
    } else {
      dispatch(forgotpasswordsuccess(response));
    }
    return response;
  } catch (error) {
    dispatch(forgotpasswordfailed(error));
    return error;
  }
};

export const resendmail = async (dispatch, data) => {
  try {
    dispatch(resendemail());
    const response = await Api.post(URLS.RESEND, data);
    console.log(response);

    if (response?.error) {
      dispatch(resendemailfailed(response?.message));
    } else {
      dispatch(resendemailsuccess(response));
    }
    return response;
  } catch (error) {
    dispatch(resendemailfailed(error));
    return error;
  }
};

export const changepasswords = async (dispatch, data) => {
  try {
    dispatch(changepassword());
    const response = await Api.post(URLS.CHANGEPASSWORD, data);
    console.log(response);

    if (response?.error) {
      dispatch(changepasswordsuccess(response?.message));
    } else {
      dispatch(changepasswordfailed(response));
    }
    return response;
  } catch (error) {
    dispatch(changepasswordfailed(error));
    return error;
  }
};
