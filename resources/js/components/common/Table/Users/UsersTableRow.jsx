import TableCell from '@mui/material/TableCell';
import { EditButton } from '@/components/common/IconButtons/EditButton';
import { ActivateButton } from '@/components/common/IconButtons/ActivateButton';
import { DeactivateButton } from '@/components/common/IconButtons/DeactivateButton';
import TableRow from '@mui/material/TableRow';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import UsersApi from '@/api/UsersApi';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

export const UsersTableRow = ({ data: user }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleDeleteUser = userId => {
    UsersApi.delete(userId)
      .then(() => {
        toast.success('Usuario desactivado exitosamente');
        queryClient.invalidateQueries(['users']);
      })
      .catch(() => toast.error('Algo salio mal'));
  };

  const handleActivateUser = userId => {
    UsersApi.enable(userId)
      .then(() => {
        toast.success('Usuario activado exitosamente');
        queryClient.invalidateQueries(['users']);
      })
      .catch(() => toast.error('Algo salio mal'));
  };

  return (
    <TableRow key={user.id}>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role?.name || ''}</TableCell>
      <TableCell>{user.company?.name}</TableCell>
      <TableCell>{user.deleted_at ? 'Inactivo' : 'Activo'}</TableCell>
      <TableCell align="right">
        <EditButton
          tooltipText="Editar usuario"
          onClick={() => navigate(`/users/add/${user.id}`)}
        />
        {user.deleted_at ? (
          <ActivateButton
            tooltipText="Habilitar usuario"
            onClick={() => handleActivateUser(user.id)}
          />
        ) : (
          <DeactivateButton
            tooltipText="Desactivar usuario"
            onClick={() => handleDeleteUser(user.id)}
            disabled={auth?.id === user.id}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
