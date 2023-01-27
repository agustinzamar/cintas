import axiosIntance from '@/api/apiHelper';

class SubscriptionsApi {
  async get() {
    const response = await axiosIntance.get('/subscriptions');
    return response.data;
  }

  async getOne(id) {
    const response = await axiosIntance.get(`/subscriptions/${id}`);
    return response.data;
  }

  async create(data) {
    const response = await axiosIntance.post('/subscriptions', data);
    return response.data;
  }

  async update(data) {
    const response = await axiosIntance.put(`/subscriptions/${data.id}`, data);
    return response.data;
  }

  async delete(subscriptionId) {
    const response = await axiosIntance.delete(
      `/subscriptions/${subscriptionId}`
    );
    return response.data;
  }

  async enable(subscriptionId) {
    const response = await axiosIntance.post(
      `/subscriptions/${subscriptionId}/restore`
    );
    return response.data;
  }
}

export default new SubscriptionsApi();
