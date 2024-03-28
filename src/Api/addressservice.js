import {
  createaddress,
  createaddressfailed,
  createaddsuccess,
} from '../Redux/Reducers/Address/createaddressreducer';

import {URLS} from './apiConstants';
import Api from './index';

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
