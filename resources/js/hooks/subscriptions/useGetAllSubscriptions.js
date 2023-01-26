import { useQuery } from 'react-query';
import SubscriptionsApi from '@/api/SubscriptionsApi';

export const useGetSubscriptions = () => {
  return useQuery(['subscriptions'], SubscriptionsApi.get);
};
