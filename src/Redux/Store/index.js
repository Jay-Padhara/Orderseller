import {configureStore} from '@reduxjs/toolkit';
import loginreducer from '../Reducers/Authentication/loginreducer';
import registerreducer from '../Reducers/Authentication/registerreducer';
import forgotpassreducer from '../Reducers/Authentication/forgotpassreducer';
import createcompreducer from '../Reducers/Company/createcompreducer';
import resendreducer from '../Reducers/Authentication/resendreducer';
import getallcategoryreducer from '../Reducers/Category/getallcategory';
import addcategory from '../Reducers/Category/addcategory';
import editcategoryreducer from '../Reducers/Category/editcategoryreducer';
import deletecategoryreducer from '../Reducers/Category/deletecategoryreducer';
import addproduct from '../Reducers/Product/addproduct';
import editproductreducer from '../Reducers/Product/editreducer';
import getallproductreducer from '../Reducers/Product/getallproductreducer';
import deleteproductreducer from '../Reducers/Product/deleteproduct';
import getallbuyerreducer from '../Reducers/Buyer/getallbuyerreducer';
import editbuyerreducer from '../Reducers/Buyer/editbuyerreducer';
import deletebuyerreducer from '../Reducers/Buyer/deletebuyerreducer';
import createbuyerreducer from '../Reducers/Buyer/createbuyerreducer';
import changestatusreducer from '../Reducers/Buyer/changestatusreducer';
import buyerrequestreducer from '../Reducers/Buyer/buyerrequestreducer';
import acceptrejectreducer from '../Reducers/Buyer/acceptrejectreducer';
import getallorderreducer from '../Reducers/Orders/getallorderreducer';
import createorderreducer from '../Reducers/Orders/createorderreducer';

export const store = configureStore({
  reducer: {
    login: loginreducer,
    register: registerreducer,
    forgot: forgotpassreducer,
    createcomp: createcompreducer,
    resend: resendreducer,
    getallcate: getallcategoryreducer,
    addcate: addcategory,
    editcate: editcategoryreducer,
    deletecate: deletecategoryreducer,
    addproduct: addproduct,
    getallproduct: getallproductreducer,
    editproduct: editproductreducer,
    deleteproduct: deleteproductreducer,
    getallbuyer: getallbuyerreducer,
    createbuyer: createbuyerreducer,
    editbuyer: editbuyerreducer,
    deletebuyer: deletebuyerreducer,
    changestatus: changestatusreducer,
    buyerrequest: buyerrequestreducer,
    acceptreject: acceptrejectreducer,
    getallorder: getallorderreducer,
    createorder: createorderreducer,
  },
});
