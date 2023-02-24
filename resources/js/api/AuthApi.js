import axiosIntance from '@/api/apiHelper';

class AuthApi {
  login(data) {
    return axiosIntance.post('/login', data);
  }

  me() {
    return axiosIntance.get('/me');
  }

  async logout() {
    return await axiosIntance.delete('/logout');
  }
}

export default new AuthApi();
