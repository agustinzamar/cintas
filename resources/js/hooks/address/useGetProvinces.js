import { useQuery } from 'react-query';
import AddressApi from '@/api/AddressApi';

export const useGetProvinces = () => {
  return useQuery(['provinces'], AddressApi.getProvinces);
};
