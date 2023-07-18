import axiosClient from './axiosClient';

const authApi = {
  register(data) {
    const url = '/users';
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = '/login';
    return axiosClient.post(url, data);
  },

  logout() {
    const url = '/logout';
    return axiosClient.post(url);
  }
};

export default authApi;
