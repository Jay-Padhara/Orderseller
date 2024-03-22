import {
  createbuyer,
  createbuyerfailed,
  createbuyersuccess,
} from '../Redux/Reducers/Buyer/createbuyerreducer';

import {
  getallbuyer,
  getallbuyerfailed,
  getallbuyersuccess,
} from '../Redux/Reducers/Buyer/getallbuyerreducer';

import {
  changestatus,
  changestatusfailed,
  changestatussuccess,
} from '../Redux/Reducers/Buyer/changestatusreducer';

import {
  editbuyer,
  editbuyerfailed,
  editbuyersuccess,
} from '../Redux/Reducers/Buyer/editbuyerreducer';

import {URLS} from './apiConstants';
import Api from './index';

export const getallbuyers = async dispatch => {
  try {
    dispatch(getallbuyer());
    const response = await Api.get(URLS.GETALLBUYER);
    console.log(response, 'getall company response');

    if (!response?.error) {
      dispatch(getallbuyersuccess(response));
    } else {
      dispatch(getallbuyerfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(getallbuyerfailed(error));
    return error;
  }
};

export const createbuyers = async (dispatch, data) => {
  try {
    dispatch(createbuyer());
    const response = await Api.post(URLS.CRAETEBUYER, data, {
      isMultipart: true,
    });
    console.log(response, 'create buyer response');

    if (!response?.error) {
      dispatch(createbuyersuccess(response));
    } else {
      dispatch(createbuyerfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(createbuyerfailed(error));
    return error;
  }
};

export const editbuyers = async (dispatch, id, data) => {
  try {
    dispatch(editbuyer());
    const response = await Api.put(`${URLS.EDITBUYER}${id}`, data, {
      isMultipart: true,
    });
    console.log(response, 'edit buyer response');

    if (!response?.error) {
      dispatch(editbuyersuccess(response));
    } else {
      dispatch(editbuyerfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(editbuyerfailed(error));
    return error;
  }
};

export const changebuyerstatus = async (dispatch, id, status) => {
  try {
    dispatch(changestatus());
    const response = await Api.post(
      `${URLS.INACTIVEBUYER}${id}?isActive=${status}`,
    );
    console.log(response, 'change status response');

    if (!response?.error) {
      dispatch(changestatussuccess(response));
    } else {
      dispatch(changestatusfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(changestatusfailed(error));
    return error;
  }
};
