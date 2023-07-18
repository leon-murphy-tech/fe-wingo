import axiosClient from './axiosClient';

const serviceApi = {
  getAll(params) {
    const url = '/service';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/service/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/service';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/service/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/service/${id}`;
    return axiosClient.delete(url);
  }
};

export default serviceApi;
