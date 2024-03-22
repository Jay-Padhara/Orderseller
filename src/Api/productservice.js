import {
  addpro,
  addprofailed,
  addprosuccess,
} from '../Redux/Reducers/Product/addproduct';
import {
  deletepro,
  deleteprofailed,
  deleteprosuccess,
} from '../Redux/Reducers/Product/deleteproduct';
import {
  editpro,
  editprofailed,
  editprosuccess,
} from '../Redux/Reducers/Product/editreducer';

import {
  getallproduct,
  getallproductfailed,
  getallproductsuccess,
} from '../Redux/Reducers/Product/getallproductreducer';

import {URLS} from './apiConstants';
import Api from './index';

export const getallproducts = async (dispatch, id) => {
  try {
    dispatch(getallproduct());
    const response = await Api.get(`${URLS.GETALLPRODUCTS}?company=${id}`);
    console.log(response);

    if (!response?.error) {
      dispatch(getallproductsuccess(response));
    } else {
      dispatch(getallproductfailed(response?.message));
    }
    return response;
  } catch (error) {
    dispatch(getallproductfailed(error));
    return error;
  }
};

export const addproduct = async (dispatch, data) => {
  try {
    dispatch(addpro());
    const response = await Api.post(URLS.ADDPRODUCT, data, {
      isMultipart: true,
    });
    console.log(response, 'create product response');

    if (!response?.error) {
      dispatch(addprosuccess(response));
    } else {
      dispatch(addprofailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(addprofailed(error));
    return error;
  }
};

export const deleteproduct = async (dispatch, id) => {
  try {
    dispatch(deletepro());
    const response = await Api.delete(URLS.DELETEPRODUCT, {data: id});
    console.log(response, 'delete product');

    if (!response?.error) {
      dispatch(deleteprosuccess(response));
    } else {
      dispatch(deleteprofailed(response?.message));
    }
    return response;
  } catch (error) {
    console.log(error);
    dispatch(deleteprofailed(error));
    return error;
  }
};

export const editproduct = async (dispatch, id, data) => {
  try {
    console.log(data, '.....');
    dispatch(editpro());
    const response = await Api.put(`${URLS.EDITPRODUCT}${id}`, data, {
      isMultipart: true,
    });
    console.log(response);

    if (!response?.error) {
      dispatch(editprosuccess(response));
    } else {
      dispatch(editprofailed(response?.message));
    }
    return response;
  } catch (error) {
    dispatch(editprofailed(error));
    return error;
  }
};
