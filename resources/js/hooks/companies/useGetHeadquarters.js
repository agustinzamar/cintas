import { useIsSuperAdmin } from '@/hooks/useIsSuperAdmin';
import { useQuery } from 'react-query';
import CompaniesApi from '@/api/CompaniesApi';
import { useEffect } from 'react';

export const useGetHeadquarters = () => {
  const isSuperAdmin = useIsSuperAdmin();
  const query = useQuery(['companies'], CompaniesApi.get, { enabled: false });

  useEffect(() => {
    if (isSuperAdmin) query.refetch();
  }, [isSuperAdmin]);

  return {
    ...query,
    data: query.data?.filter(
      company => company.company === null && company.deleted_at === null
    ),
  };
};
