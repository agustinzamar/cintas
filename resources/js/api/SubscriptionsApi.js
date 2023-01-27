import axiosIntance from '@/api/apiHelper';

class SubscriptionsApi {
  async get() {
    const response = await axiosIntance.get('/subscriptions');
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
