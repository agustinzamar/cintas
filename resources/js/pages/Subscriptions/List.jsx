import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
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

export const SubscriptionsList = () => {
  const isSuperAdmin = useIsSuperAdmin();
  const { isLoading, data } = useGetSubscriptions();

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
                        tooltipText="Editar usuario"
                        // onClick={() => navigate(`/users/add/${user.id}`)}
                      />
                      {subscription.deleted_at ? (
                        <ActivateButton
                          tooltipText="Habilitar usuario"
                          // onClick={() => handleActivateUser(user.id)}
                        />
                      ) : (
                        <DeactivateButton
                          tooltipText="Desactivar usuario"
                          // onClick={() => handleDeleteUser(user.id)}
                          // disabled={auth?.id === user.id}
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
