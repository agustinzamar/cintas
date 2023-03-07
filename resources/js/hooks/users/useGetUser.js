import { useQuery, useQueryClient } from 'react-query';
import UsersApi from '@/api/UsersApi';
import { useEffect } from 'react';

export const useGetUser = id => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (id) {
        return await UsersApi.getOne(id);
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries(['user']);
  }, []);

  return data;
};
