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

import {
  deletebuyer,
  deletebuyerfailed,
  deletebuyersuccess,
} from '../Redux/Reducers/Buyer/deletebuyerreducer';

import {
  buyerrequest,
  buyerrequestfailed,
  buyerrequestsuccess,
} from '../Redux/Reducers/Buyer/buyerrequestreducer';

import {
  requeststatus,
  requeststatusfailed,
  requeststatussuccess,
} from '../Redux/Reducers/Buyer/acceptrejectreducer';

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

export const deletebuyers = async (dispatch, id) => {
  try {
    dispatch(deletebuyer());
    const response = await Api.delete(`${URLS.DELETEBUYER}${id}`);
    console.log(response, 'delete buyer response');

    if (!response?.error) {
      dispatch(deletebuyersuccess(response));
    } else {
      dispatch(deletebuyerfailed(response?.message));
    }
    return response;
  } catch (error) {
    dispatch(deletebuyerfailed(error));
    return error;
  }
};

export const buyerrequests = async dispatch => {
  try {
    dispatch(buyerrequest());
    const response = await Api.get(URLS.BUYERREQUEST);
    console.log(response, 'buyer request response');

    if (!response?.error) {
      dispatch(buyerrequestsuccess(response));
    } else {
      dispatch(buyerrequestfailed(response?.message));
    }
    return response;
  } catch (error) {
    dispatch(buyerrequestfailed(error));
    return error;
  }
};

export const acceptrejectrequest = async (dispatch, id, status) => {
  try {
    dispatch(requeststatus());
    const response = await Api.post(`${URLS.REQUESTSTATUS}${id}?${status}`);
    console.log(response, 'request status response');

    if (!response?.error) {
      dispatch(requeststatussuccess(response));
    } else {
      dispatch(requeststatusfailed(response?.message));
    }
    return response;
  } catch (error) {
    dispatch(requeststatusfailed(error));
    return error;
  }
};
