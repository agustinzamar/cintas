import { createContext, useEffect, useState } from 'react';
import AuthApi from '@/api/AuthApi';
import { Loader } from '@/components/common/Loader';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAuth = async () => {
    setLoading(true);
    try {
      const res = await AuthApi.me();
      setAuth(res.data);
    } catch (e) {
      setAuth(null);
      localStorage.removeItem('app-token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) getAuth();
  }, [auth]);

  const login = data => {
    return AuthApi.login(data).then(res => {
      setAuth(res.data.user);
      localStorage.setItem('app-token', res.data.token);
    });
  };

  const logout = () => {
    AuthApi.logout().then(() => {
      setAuth(null);
      localStorage.removeItem('app-token');
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
