import axiosIntance from '@/api/apiHelper';

class SubscriptionsApi {
  async get() {
    const response = await axiosIntance.get('/subscriptions');
    return response.data;
  }
}

export default new SubscriptionsApi();
