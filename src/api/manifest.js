import axiosClient from './axiosClient';

const manifestApi = {
  getAll(params) {
    const url = '/manifest';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/manifest/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/manifest';
    const config = {
      headers: {
        'content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
      }
    };
    return axiosClient.post(url, data, config);
  },

  update(data, id) {
    const url = `/manifest/${id}`;
    const config = {
      headers: {
        'content-Type': 'multipart/form-data;boundary=<calculated when request is sent>'
      }
    };
    return axiosClient.put(url, data, config);
  },

  remove(id) {
    const url = `/manifest/${id}`;
    return axiosClient.delete(url);
  }
};

export default manifestApi;
