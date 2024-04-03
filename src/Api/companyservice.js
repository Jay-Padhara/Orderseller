import {
  createcomp,
  createcompfailed,
  createcompsuccess,
} from '../Redux/Reducers/Company/createcompreducer';
import {
  getcomp,
  getcompfailed,
  getcompsuccess,
} from '../Redux/Reducers/Company/getcompanyreducer';
import {
  updatecompany,
  updatecompanyfailed,
  updatecompanysuccess,
} from '../Redux/Reducers/Company/updatecompanyreducer';

import {URLS} from './apiConstants';
import Api from './index';

export const createcompany = async (dispatch, data) => {
  try {
    dispatch(createcomp());
    const response = await Api.post(URLS.CREATECOMPANY, data, {
      isMultipart: true,
    });
    console.log(response, 'create company response');

    if (!response?.error) {
      dispatch(createcompsuccess(response));
    } else {
      dispatch(createcompfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(createcompfailed(error));
    return error;
  }
};

export const updatecompanies = async (dispatch, id, data) => {
  try {
    console.log(data, '........', id);
    dispatch(updatecompany());
    const response = await Api.put(`${URLS.UPDATECOMPANY}${id}`, data, {
      isMultipart: true,
    });
    console.log(response);

    if (!response?.error) {
      dispatch(updatecompanysuccess(response));
    } else {
      dispatch(updatecompanyfailed(response?.message));
    }
    return response;
  } catch (error) {
    dispatch(updatecompanyfailed(error));
    return error;
  }
};

export const getcompany = async (dispatch, id) => {
  try {
    console.log(id, '...');
    dispatch(getcomp());
    const response = await Api.get(`${URLS.GETCOMPANY}${id}`);
    console.log(response, 'get company response');

    if (!response?.error) {
      dispatch(getcompsuccess(response));
    } else {
      dispatch(getcompfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(getcompfailed(error));
    return error;
  }
};
