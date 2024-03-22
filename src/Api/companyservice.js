import {
  createcomp,
  createcompfailed,
  createcompsuccess,
} from '../Redux/Reducers/Company/createcompreducer';

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
