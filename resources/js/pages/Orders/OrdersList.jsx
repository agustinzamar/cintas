import { Box } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { Title } from '@/components/common/Title';
import MuiBox from '@mui/material/Box';
import { OrdersTable } from '@/components/Table/Orders/OrdersTable';
import { RoleEnum } from '@/enums/RoleEnum';

export const OrdersList = () => {
  const { auth: user } = useAuth();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MuiBox
            display="flex"
            alignItems="baseline"
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={Link}
              to="/orders/new"
              sx={{ marginRight: '1rem' }}
            >
              Nuevo pedido
            </Button>
            {user.role?.id === RoleEnum.MANAGER && (
              <Title>Pedidos de la sucursal {user.company?.name}</Title>
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
