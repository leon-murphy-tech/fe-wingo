import axios from 'axios';
import { StorageKeys } from 'constants';

const axiosClient = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-Type': 'application/json'
    // 'content-Type': 'multipart/form-data;boundary=<calculated when request is sent>'
  }
});

//interceptor
// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent

    const customHeaders = {};
    const accessToken = localStorage.getItem(StorageKeys.TOKEN);
    if (accessToken) {
      customHeaders.Authorization = `Bearer ${accessToken}`;
    }

    return {
      ...config,
      headers: {
        ...customHeaders, // auto attach token
        ...config.headers // but you can override for some requests
      }
    };
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 401, 403, 500
    return Promise.reject(error);
  }
);

export default axiosClient;
