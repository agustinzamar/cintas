import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';
import VendorsApi from '@/api/VendorsApi';

export const useGetVendor = id => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    cacheTime: 1,
    queryKey: ['vendor'],
    queryFn: async () => {
      if (id) {
        return await VendorsApi.getOne(id);
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries(['vendor']);
  }, []);

  return data;
};
