import { useParams } from 'react-router-dom';
import { Box } from '@/components/common/Box';
import { SubTitle } from '@/components/common/SubTitle';
import { Title } from '@/components/common/Title';
import { useGetOrder } from '@/hooks/orders/useGetOrder';
import Grid from '@mui/material/Grid';
import { Tooltip } from '@mui/material';
import { Loader } from '@/components/common/Loader';
import { ReadOnlyOrder } from '@/components/Table/Orders/ReadOnlyOrder';
import Button from '@mui/material/Button';
import { OrderStatusEnum } from '@/enums/OrderStatusEnum';
import { useMutation, useQueryClient } from 'react-query';
import OrdersApi from '@/api/OrdersApi';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { RoleEnum } from '@/enums/RoleEnum';

export const Order = () => {
  const { auth: user } = useAuth();
  const { orderId } = useParams();
  const { data: order, isLoading: isLoadingOrder } = useGetOrder(orderId);
  const { mutate, isLoading: isLoadingMutate } = useMutation(
    OrdersApi.updateStatus
  );
  const queryClient = useQueryClient();
  const isLoading = isLoadingOrder || isLoadingMutate;
  const canSeeButtons =
    user.role?.id === RoleEnum.ADMIN ||
    user.role?.id === RoleEnum.SUPERADMIN ||
    user.role?.id === RoleEnum.WAREHOUSE_MANAGER;

  const handleSubmit = orderStatus => {
    const wasApproved = orderStatus === OrderStatusEnum.APPROVED;
    const payload = {
      orderId: orderId,
      orderStatusId: orderStatus,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success(
          `El pedido fue ${wasApproved ? 'aprobado' : 'rechazado'}`
        );
        queryClient.invalidateQueries(['order']);
      },
      onError: () => toast.error('Lo sentimos, algo salió mal'),
    });
  };

  if (isLoading || !order) {
    return <Loader />;
  }

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Title>Pedido #{orderId} </Title>
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={4}>
              <SubTitle>
                <strong>Fecha de creación:</strong> {order.created_at}
              </SubTitle>
            </Grid>
            <Grid item xs={4}>
              <SubTitle>
                {' '}
                <strong>Sucursal:</strong> {order.company?.name}
              </SubTitle>
            </Grid>
            <Grid item xs={4}>
              <SubTitle>
                <strong>Estado: </strong>
                <Tooltip title={order.status?.description}>
                  <span>{order.status?.name}</span>
                </Tooltip>
              </SubTitle>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Title>Artículos</Title>
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyOrder order={order} />
          </Grid>
        </Grid>
      </Box>

      {order.status?.id === OrderStatusEnum.SUBMITTED && canSeeButtons && (
        <Box sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            onClick={() => handleSubmit(OrderStatusEnum.REJECTED)}
            sx={{ marginRight: '1rem' }}
            color="secondary"
          >
            Rechazar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit(OrderStatusEnum.APPROVED)}
          >
            Aprobar
          </Button>
        </Box>
      )}
    </>
  );
};
