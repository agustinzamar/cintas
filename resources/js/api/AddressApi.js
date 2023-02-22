import axiosIntance from '@/api/apiHelper';

class AddressApi {
  async getProvinces() {
    const response = await axiosIntance.get('/provinces');
    return response.data;
  }

  async getCitiesByProvince(provinceId) {
    const response = await axiosIntance.get(`/cities/${provinceId}`);
    return response.data;
  }
}

export default new AddressApi();
