import {showMessage} from 'react-native-flash-message';

export const regemail = /^(?!.*\s)[\w-.]+@([\w-]+\.)+[a-z]{2,4}(?<!\s)$/;
export const reggst = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
export const regpan = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export const states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry',
];

export const Images = [
  'https://www.thespruce.com/thmb/Ft5dokShWCaRm1Hb4AY4IuL8wNM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Mercedes-White-Small-Living-Room-58a8c6dc3df78c345b35e545.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTinGCfuvtIzNvb6AsRFE7LtRJrTEKDxVxe6g&usqp=CAU',
  'https://www.thespruce.com/thmb/gaePwUABkxZcBdODsgAdDZMFY6U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lee-home-la-echoearl-5-5b897792c9e77c00258a80e4.jpg',
];

export const handleMessage = (title, desc, type) => {
  showMessage({
    message: title,
    description: desc,
    type: type,
  });
};

// SANKAT SAMAY NI SAKAL

// try {
//   const prodata = await axios({
//     baseURL: `http://146.190.140.18:2727${URLS.EDITPRODUCT}${proid}`,
//     method: 'PUT',
//     data: formData,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   console.log(prodata, '...');
// } catch (error) {
//   console.log(error);
//   console.log(error.request, 'req');
//   console.log(error.response, 'res');
// }
