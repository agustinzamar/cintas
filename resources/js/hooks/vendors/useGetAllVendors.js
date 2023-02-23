import { useQuery } from 'react-query';
import VendorsApi from '@/api/VendorsApi';

export const useGetAllVendors = () => {
  return useQuery(['vendor'], VendorsApi.get);
};
