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

  async resetPasswordEmail(data) {
    return await axiosIntance.post('/recover-password', data);
  }

  async resetPassword(data) {
    return await axiosIntance.post('/reset-password', data);
  }
}

export default new AuthApi();
