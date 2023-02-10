import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';
import CompaniesApi from '@/api/CompaniesApi';

export const useGetCompany = id => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    cacheTime: 1,
    queryKey: ['company'],
    queryFn: async () => {
      if (id) {
        return await CompaniesApi.getOne(id);
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries(['company']);
  }, []);

  return data;
};
