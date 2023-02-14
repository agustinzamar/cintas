import { useQuery } from 'react-query';
import SettingsApi from '@/api/SettingsApi';

export const useGetAllSettings = () => {
  return useQuery(['settings'], SettingsApi.get);
};
