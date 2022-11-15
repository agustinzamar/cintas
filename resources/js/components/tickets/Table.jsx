import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import { useGetTicketTypes } from '@/hooks/tickets/useGetTicketTypes';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Box } from '@/components/common/Box';
import Grid from '@mui/material/Grid';
import { DeleteButton } from '@/components/common/IconButtons/DeleteButton';
import { useMutation, useQueryClient } from 'react-query';
import TicketsApi from '@/api/TicketsApi';
import { toast } from 'react-toastify';

export const TicketsTable = ({ ...rest }) => {
  const { data: ticketTypes } = useGetTicketTypes();
  const { mutate } = useMutation(TicketsApi.deleteTicketType);
  const queryClient = useQueryClient();

  const handleDelete = id => {
    mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData(['ticket-types'], prev => {
          prev.splice(
            prev.findIndex(x => x.id === id),
            1
          );
          return prev;
        });
        toast.success('Entrada eliminada exitosamente');
      },
      onError: () => toast.error('Algo salió mal'),
    });
  };

  return (
    <Box {...rest}>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Es pública</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticketTypes?.length > 0 &&
                ticketTypes.map(ticketType => (
                  <TableRow key={ticketType.id}>
                    <TableCell>{ticketType.id}</TableCell>
                    <TableCell>{ticketType.name}</TableCell>
                    <TableCell>
                      ${Number(ticketType.price).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {ticketType.is_public ? (
                        <CheckIcon color="primary" />
                      ) : (
                        <ClearIcon color="error" />
                      )}
                    </TableCell>
                    <TableCell align="right" width="5%">
                      <DeleteButton
                        tooltipText="Eliminar entrada"
                        onClick={() => handleDelete(ticketType.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};