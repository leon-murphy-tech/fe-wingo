import axiosClient from './axiosClient';

const trackingApi = {
  getAll(params) {
    const url = '/tracking';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/tracking/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/tracking';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/tracking/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/tracking/${id}`;
    return axiosClient.delete(url);
  }
};

export default trackingApi;
