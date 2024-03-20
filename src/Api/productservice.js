import {
  addpro,
  addprofailed,
  addprosuccess,
} from '../Redux/Reducers/Product/addproduct';

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
