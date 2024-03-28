import {
  createorder,
  createorderfailed,
  createordersuccess,
} from '../Redux/Reducers/Orders/createorderreducer';

import {
  getallorder,
  getallorderfailed,
  getallordersuccess,
} from '../Redux/Reducers/Orders/getallorderreducer';

import {URLS} from './apiConstants';
import Api from './index';

export const getallorders = async dispatch => {
  try {
    dispatch(getallorder());
    const response = await Api.get(URLS.GETALLORDER);
    console.log(response, 'getallorders response');

    if (!response?.error) {
      dispatch(getallordersuccess(response));
    } else {
      dispatch(getallorderfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.error(error);
    dispatch(getallorderfailed(error));
    return error;
  }
};

export const createorders = async dispatch => {
  try {
    dispatch(createorder());
    const response = await Api.post(URLS.CREATEORDER);
    console.log(response, 'create order response');

    if (!response?.error) {
      dispatch(createordersuccess(response));
    } else {
      dispatch(createorderfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.error(error);
    dispatch(createorderfailed(error));
    return error;
  }
};
