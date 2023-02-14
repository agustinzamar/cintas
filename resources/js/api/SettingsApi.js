import axiosIntance from '@/api/apiHelper';

class SettingsApi {
  async get() {
    const response = await axiosIntance.get('/settings');
    return response.data;
  }

  async create(data) {
    const response = await axiosIntance.post('/settings', data);
    return response.data;
  }
}

export default new SettingsApi();
