import axiosIntance from '@/api/apiHelper';

class VendorsApi {
  async get() {
    const response = await axiosIntance.get('/vendors');
    return response.data;
  }

  async getOne(id) {
    const response = await axiosIntance.get(`/vendors/${id}`);
    return response.data;
  }

  async create(data) {
    const response = await axiosIntance.post('/vendors', data);
    return response.data;
  }

  async update(data) {
    const response = await axiosIntance.put(`/vendors/${data.id}`, data);
    return response.data;
  }

  async delete(id) {
    const response = await axiosIntance.delete(`/vendors/${id}`);
    return response.data;
  }

  async restore(id) {
    const response = await axiosIntance.post(`/vendors/${id}/restore`);
    return response.data;
  }
}

export default new VendorsApi();
