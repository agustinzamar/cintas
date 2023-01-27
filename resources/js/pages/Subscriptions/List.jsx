import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@/components/common/Box';
import { Loader } from '@/components/common/Loader';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { EditButton } from '@/components/common/IconButtons/EditButton';
import { ActivateButton } from '@/components/common/IconButtons/ActivateButton';
import { DeactivateButton } from '@/components/common/IconButtons/DeactivateButton';
import { useIsSuperAdmin } from '@/hooks/useIsSuperAdmin';
import { useGetSubscriptions } from '@/hooks/subscriptions/useGetAllSubscriptions';
import currency from 'currency.js';
import SubscriptionsApi from '@/api/SubscriptionsApi';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

export const SubscriptionsList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isSuperAdmin = useIsSuperAdmin();
  const { isLoading, data } = useGetSubscriptions();

  const handleDeleteSubscription = subscriptionId => {
    SubscriptionsApi.delete(subscriptionId)
      .then(() => {
        toast.success('Plan desactivado exitosamente');
        queryClient.invalidateQueries(['subscriptions']);
      })
      .catch(() => toast.error('Algo salio mal'));
  };

  const handleActivateSubscription = subscriptionId => {
    SubscriptionsApi.enable(subscriptionId)
      .then(() => {
        toast.success('Plan activado exitosamente');
        queryClient.invalidateQueries(['subscriptions']);
      })
      .catch(() => toast.error('Algo salio mal'));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/subscriptions/add"
        >
          Nuevo plan
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Box>
          {isLoading && <Loader />}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Estado</TableCell>
                {isSuperAdmin && <TableCell>Empresa</TableCell>}
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 &&
                data.map(subscription => (
                  <TableRow key={subscription.id}>
                    <TableCell>{subscription.name}</TableCell>
                    <TableCell>{subscription.description}</TableCell>
                    <TableCell>
                      {currency(subscription.price).format() || ''}
                    </TableCell>
                    <TableCell>
                      {subscription.deleted_at ? 'Inactivo' : 'Activo'}
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell>{subscription.company?.name}</TableCell>
                    )}
                    <TableCell align="right">
                      <EditButton
                        tooltipText="Editar plan"
                        onClick={() =>
                          navigate(`/subscriptions/add/${subscription.id}`)
                        }
                      />
                      {subscription.deleted_at ? (
                        <ActivateButton
                          tooltipText="Habilitar plan"
                          onClick={() =>
                            handleActivateSubscription(subscription.id)
                          }
                        />
                      ) : (
                        <DeactivateButton
                          tooltipText="Desactivar plan"
                          onClick={() =>
                            handleDeleteSubscription(subscription.id)
                          }
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  );
};
