import { Box, Typography } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import MuiBox from '@mui/material/Box';
import { OrdersTable } from '@/components/Table/Orders/OrdersTable';
import { RoleEnum } from '@/enums/RoleEnum';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import Title from '@/components/common/Title';

export const OrdersList = () => {
  const { auth: user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries(['order']);
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MuiBox display="flex" alignItems="baseline">
            {user.role?.id === RoleEnum.WAREHOUSE_MANAGER ? (
              <Title>Pedidos pendientes</Title>
            ) : (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                component={Link}
                to="/orders/new"
                sx={{ marginRight: '1rem' }}
              >
                Nuevo pedido
              </Button>
            )}
            {user.role?.id === RoleEnum.MANAGER && (
              <Typography>
                Solo se visualizan los pedidos pendientes de envío o cancelados
                correspondientes a la sucursal "{user.company?.name}"
              </Typography>
            )}
          </MuiBox>
        </Grid>
        <Grid item xs={12}>
          <OrdersTable />
        </Grid>
      </Grid>
    </Box>
  );
};
