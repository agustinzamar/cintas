import OrdersApi from '@/api/OrdersApi';
import { useQuery } from 'react-query';

export const useGetAllOrders = () => {
  return useQuery('orders', OrdersApi.get);
};
