import axiosIntance from '@/api/apiHelper';

class CompaniesApi {
  async get() {
    const response = await axiosIntance.get('/companies');
    return response.data;
  }

  async getOne(id) {
    const response = await axiosIntance.get(`/companies/${id}`);
    return response.data;
  }

  async create(company) {
    const response = await axiosIntance.post('/companies', company);
    return response.data;
  }

  async update(company) {
    const response = await axiosIntance.put(
      `/companies/${company.id}`,
      company
    );
    return response.data;
  }

  async delete(id) {
    const response = await axiosIntance.delete(`/companies/${id}`);
    return response.data;
  }

  async enable(id) {
    const response = await axiosIntance.post(`/companies/${id}/restore`);
    return response.data;
  }
}

export default new CompaniesApi();
