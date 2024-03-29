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

import {
  updatestatus,
  updatestatusfailed,
  updatestatussuccess,
} from '../Redux/Reducers/Orders/orderstatusreducer';

import {
  updateorder,
  updateorderfailed,
  updateordersuccess,
} from '../Redux/Reducers/Orders/updateorderreducer';

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
    console.log(error);
    dispatch(getallorderfailed(error));
    return error;
  }
};

export const createorders = async (dispatch, data) => {
  try {
    dispatch(createorder());
    const response = await Api.post(URLS.CREATEORDER, data);
    console.log(response, 'create order response');

    if (!response?.error) {
      dispatch(createordersuccess(response));
    } else {
      dispatch(createorderfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(createorderfailed(error));
    return error;
  }
};

export const updateorders = async (dispatch, id, data) => {
  try {
    dispatch(updateorder());
    const response = await Api.put(`${URLS.UPDATEORDER}${id}`, data);
    console.log(response, 'update order response');

    if (!response?.error) {
      dispatch(updateordersuccess(response));
    } else {
      dispatch(updateorderfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(updateorderfailed(error));
    return error;
  }
};

export const updateorderstatus = async (dispatch, id, data) => {
  try {
    dispatch(updatestatus());
    const response = await Api.put(
      `${URLS.UPDATESTATUS}${id}/updateStatus`,
      data,
    );
    console.log(response, 'update oreder status response');

    if (!response?.error) {
      dispatch(updatestatussuccess(response));
    } else {
      dispatch(updatestatusfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(updatestatusfailed(error));
    return error;
  }
};
