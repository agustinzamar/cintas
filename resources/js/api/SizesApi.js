import axiosIntance from '@/api/apiHelper';

class SizesApi {
  async get() {
    const response = await axiosIntance.get('/sizes');
    return response.data;
  }
}

export default new SizesApi();
