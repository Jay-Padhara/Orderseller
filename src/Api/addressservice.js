import {
  createaddress,
  createaddressfailed,
  createaddsuccess,
} from '../Redux/Reducers/Address/createaddressreducer';
import {
  getalladdress,
  getalladdressfailed,
  getalladdresssuccess,
} from '../Redux/Reducers/Address/getalladdressreducer';

import {URLS} from './apiConstants';
import Api from './index';

export const getalladdresses = async (dispatch, id) => {
  try {
    dispatch(getalladdress());
    const response = await Api.get(`${URLS.GETALLADDRESS}${id}/get/address`);
    console.log(response, 'get all address response');

    if (!response?.error) {
      dispatch(getalladdresssuccess(response));
    } else {
      dispatch(getalladdressfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(getalladdressfailed(error));
    return error;
  }
};

export const createaddresses = async (dispatch, id, data) => {
  try {
    dispatch(createaddress());
    const response = await Api.post(
      `${URLS.CREATEADDRESS}${id}/add/address`,
      data,
    );
    console.log(response, 'create address response');

    if (!response?.error) {
      dispatch(createaddsuccess(response));
    } else {
      dispatch(createaddressfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(createaddressfailed(error));
    return error;
  }
};
