import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

//localhost
// export const host = __DEV__
//   ? 'http://192.168.29.206:2525'
//   : 'http://192.168.29.206:2525';

//live mode
export const host = __DEV__
  ? 'http://146.190.140.18:2727'
  : 'http://146.190.140.18:2727';

let axiosinstance = axios.create({
  baseURL: host,
});

console.log('base URL......', host);

axiosinstance.defaults.headers.common['Platform-Type'] = 'web';

async function network() {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected;
  } catch (error) {
    console.log('Error fetching network state:', error);
    return false;
  }
}

axiosinstance.interceptors.request.use(
  async config => {
    try {
      if (await network()) {
        config.headers['Content-Type'] = config.isMultipart
          ? 'multipart/form-data'
          : 'application/json';

        return config;
      } else {
        throw new Error('No internet connection');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

axiosinstance.interceptors.response.use(
  response => {
    return response?.data;
  },
  error => {
    console.log('main error log--------', error, error?.response);
    if (error?.response?.data) {
      return Promise.reject(error?.response?.data);
    } else {
      return Promise.reject(error);
    }
  },
);
export default axiosinstance;
