import axiosIntance from '@/api/apiHelper';

class OrdersApi {
  async get() {
    const response = await axiosIntance.get('/orders');
    return response.data;
  }

  async getOne(id) {
    const response = await axiosIntance.get(`/orders/${id}`);
    return response.data;
  }

  async create(data) {
    const response = await axiosIntance.post('/orders', data);
    return response.data;
  }

  async update(data) {
    const response = await axiosIntance.put(`/orders/${data.id}`, data);
    return response.data;
  }

  async delete(id) {
    const response = await axiosIntance.delete(`/orders/${id}`);
    return response.data;
  }

  async updateStatus(id, statusId) {
    const response = await axiosIntance.put(`/orders/${id}/updateStatus`, {
      order_status_id: statusId,
    });
    return response.data;
  }
}

export default new OrdersApi();
