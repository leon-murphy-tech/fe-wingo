import axiosClient from './axiosClient';

const shipmentApi = {
  getAll(params) {
    const url = '/shipment';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/shipment/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/shipment';
    const config = {
      headers: {
        'content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
      }
    };
    return axiosClient.post(url, data, config);
  },

  update(data, id) {
    const url = `/shipment/${id}`;
    const config = {
      headers: {
        'content-Type': 'multipart/form-data;boundary=<calculated when request is sent>'
      }
    };
    return axiosClient.put(url, data, config);
  },

  remove(id) {
    const url = `/shipment/${id}`;
    return axiosClient.delete(url);
  }
};

export default shipmentApi;
