import axiosClient from './axiosClient';

const userApi = {
  getAll(params) {
    const url = '/users';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  getCurrentUser(params) {
    const url = `/current-user`;
    return axiosClient.get(url, { params });
  },

  add(data) {
    const url = '/users';
    const config = {
      headers: {
        'content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
      }
    };
    return axiosClient.post(url, data, config);
  },

  update(data, id) {
    const url = `/users/${id}`;

    const config = {
      headers: {
        'content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
      }
    };
    return axiosClient.put(url, data, config);
  },

  remove(id) {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  }
};

export default userApi;
