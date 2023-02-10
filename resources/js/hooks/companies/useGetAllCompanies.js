import { useQuery } from 'react-query';
import CompaniesApi from '@/api/CompaniesApi';

export const useGetAllCompanies = () => {
  return useQuery(['companies'], CompaniesApi.get);
};
