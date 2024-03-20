import {configureStore} from '@reduxjs/toolkit';
import loginreducer from '../Reducers/Authentication/loginreducer';
import registerreducer from '../Reducers/Authentication/registerreducer';
import forgotpassreducer from '../Reducers/Authentication/forgotpassreducer';
import createcompreducer from '../Reducers/Company/createcompreducer';
import resendreducer from '../Reducers/Authentication/resendreducer';
import getallcategory from '../Reducers/Category/getallcategory';
import addcategory from '../Reducers/Category/addcategory';
import editcategoryreducer from '../Reducers/Category/editcategoryreducer';
import deletecategoryreducer from '../Reducers/Category/deletecategoryreducer';
import addproduct from '../Reducers/Product/addproduct';
import deleteproductreducer from '../Reducers/Product/deleteproduct';

export const store = configureStore({
  reducer: {
    login: loginreducer,
    register: registerreducer,
    forgot: forgotpassreducer,
    createcomp: createcompreducer,
    resend: resendreducer,
    getallcate: getallcategory,
    addcate: addcategory,
    editcate: editcategoryreducer,
    deletecate: deletecategoryreducer,
    addproduct: addproduct,
    deleteproduct: deleteproductreducer,
  },
});
