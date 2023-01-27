import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';
import SubscriptionsApi from '@/api/SubscriptionsApi';

export const useGetSubscription = id => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    cacheTime: 1,
    queryKey: ['subscription'],
    queryFn: async () => {
      if (id) {
        return await SubscriptionsApi.getOne(id);
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries(['subscription']);
  }, []);

  return data;
};
