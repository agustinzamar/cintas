import SizesApi from '@/api/SizesApi';
import { useQuery } from 'react-query';

export const useGetAllSizes = () => {
  return useQuery('sizes', SizesApi.get);
};
