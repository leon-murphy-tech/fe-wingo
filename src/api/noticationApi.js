import axiosClient from './axiosClient';

const notificationApi = {
  getAll(params) {
    const url = '/notification';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/notification/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/notification';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/notification/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/notification/${id}`;
    return axiosClient.delete(url);
  }
};

export default notificationApi;
