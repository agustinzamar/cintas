import { useQuery } from 'react-query';
import AddressApi from '@/api/AddressApi';
import { useEffect } from 'react';

export const useGetCitiesByProvince = provinceId => {
  const query = useQuery(['cities', provinceId], {
    queryFn: () => AddressApi.getCitiesByProvince(provinceId),
    enabled: false,
  });

  useEffect(() => {
    if (provinceId) {
      query.refetch();
    }
  }, [provinceId]);

  return query;
};
