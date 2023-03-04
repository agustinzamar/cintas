import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';
import OrdersApi from '@/api/OrdersApi';

export const useGetOrder = id => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['order'],
    queryFn: async () => {
      if (id) {
        return await OrdersApi.getOne(id);
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries(['order']);
  }, []);

  return query;
};
