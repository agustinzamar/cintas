import { useGetAllOrders } from '@/hooks/orders/useGetAllOrders';
import { Box } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

export const OrdersList = () => {
  const { data: orders } = useGetAllOrders();
  const { auth: user } = useAuth();

  return <Box>Sucursal: {user.company?.name}</Box>;
};
