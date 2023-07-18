import axiosClient from './axiosClient';

const adddressBookApi = {
  getAll(params) {
    const url = '/address';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/address/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/address';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/address/${data.uuid}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/address/${id}`;
    return axiosClient.delete(url);
  }
};

export default adddressBookApi;
