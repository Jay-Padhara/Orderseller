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
