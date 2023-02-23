import { useQuery } from 'react-query';
import UsersApi from '@/api/UsersApi';

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: UsersApi.get,
  });
};
