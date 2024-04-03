export const URLS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CREATECOMPANY: '/company',
  UPDATECOMPANY: '/company/',
  FORGOTPASSWORD: '/auth/forgot-password',
  RESEND: '/auth/resend-verify-email',
  GETALLCATEGORY: '/categories?',
  ADDCATEGORY: '/categories',
  EDITCATEGORY: '/categories/',
  DELETECATEGORY: '/categories',
  GETALLPRODUCTS: '/product?',
  ADDPRODUCT: '/product',
  DELETEPRODUCT: '/product',
  EDITPRODUCT: '/product/',
  GETALLBUYER: '/companyRelations/getRelations?buyerLists=true',
  CRAETEBUYER: '/company/createbuyer',
  EDITBUYER: '/company/',
  DELETEBUYER: '/company/',
  INACTIVEBUYER: '/companyRelations/acceptRequest/',
  BUYERREQUEST: '/companyRelations/getRelations?isRequested=true',
  REQUESTSTATUS: '/companyRelations/acceptRequest/',
  GETALLORDER: '/order',
  CREATEORDER: '/order',
  UPDATEORDER: '/order/',
  GETALLADDRESS: '/company/',
  CREATEADDRESS: '/company/',
  UPDATEADDRESS: '/company/',
  GETCOMPANY: '/company/',
  UPDATESTATUS: '/order/',
  CHANGEPASSWORD: '/auth/change-password',
};
