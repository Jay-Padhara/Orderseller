import {
  addcategory,
  addcategoryfailed,
  addcategorysuccess,
} from '../Redux/Reducers/Category/addcategory';

import {URLS} from './apiConstants';
import Api from './index';

import {
  editcategory,
  editcategoryfailed,
  editcategorysuccess,
} from '../Redux/Reducers/Category/editcategoryreducer';

import {
  getallcate,
  getallcatefailed,
  getallcatesuccess,
} from '../Redux/Reducers/Category/getallcategory';
import {
  deletecategory,
  deletecategoryfailed,
  deletecategorysuccess,
} from '../Redux/Reducers/Category/deletecategoryreducer';

export const getallcategory = async (dispatch, id) => {
  try {
    dispatch(getallcate());
    const response = await Api.get(`${URLS.GETALLCATEGORY}?company=${id}`);
    console.log(response, 'all category response');

    if (!response?.error) {
      dispatch(getallcatesuccess(response));
    } else {
      dispatch(getallcatefailed(response?.message));
    }
    return response;
  } catch (error) {
    console.error(error);
    dispatch(getallcatefailed(error));
    return error;
  }
};

export const addnewcategory = async (dispatch, data) => {
  try {
    dispatch(addcategory());
    const response = await Api.post(URLS.ADDCATEGORY, data);
    console.log(response);

    if (!response?.error) {
      dispatch(addcategorysuccess(response));
    } else {
      dispatch(addcategoryfailed(response?.message));
    }
    return response;
  } catch (error) {
    dispatch(addcategoryfailed(error));
    return error;
  }
};

export const editcategories = async (dispatch, id, data) => {
  try {
    dispatch(editcategory());
    const response = await Api.put(`${URLS.EDITCATEGORY}${id}`, data);
    console.log(response);

    if (!response?.error) {
      dispatch(editcategorysuccess(response));
    } else {
      dispatch(editcategoryfailed(response?.message));
    }
    return response;
  } catch (error) {
    dispatch(editcategoryfailed(error));
    return error;
  }
};

export const deletecategories = async (dispatch, id) => {
  try {
    dispatch(deletecategory());
    const response = await Api.delete(URLS.DELETECATEGORY, {data: id});
    console.log(response, 'delete category');

    if (!response?.error) {
      dispatch(deletecategorysuccess(response));
    } else {
      dispatch(deletecategoryfailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(deletecategoryfailed(error));
    return error;
  }
};
