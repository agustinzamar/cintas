import { TableCell, TableRow } from '@mui/material';
import { EditButton } from '@/components/common/IconButtons/EditButton';
import { ActivateButton } from '@/components/common/IconButtons/ActivateButton';
import { DeactivateButton } from '@/components/common/IconButtons/DeactivateButton';
import { useNavigate } from 'react-router-dom';
import CompaniesApi from '@/api/CompaniesApi';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

export const BranchesTableRow = ({ data: branch }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleDeleteBranch = branchId => {
    CompaniesApi.delete(branchId)
      .then(() => {
        toast.success('Sucursal desactivada exitosamente');
        queryClient.invalidateQueries(['companies']);
      })
      .catch(() => toast.error('Algo salio mal'));
  };

  const handleActivateBranch = branchId => {
    CompaniesApi.enable(branchId)
      .then(() => {
        toast.success('Sucursal activada exitosamente');
        queryClient.invalidateQueries(['companies']);
      })
      .catch(() => toast.error('Algo salio mal'));
  };

  return (
    <TableRow key={branch.id}>
      <TableCell>{branch.name}</TableCell>
      <TableCell>{branch.city.name}</TableCell>
      <TableCell>{branch.city.province.name}</TableCell>
      <TableCell>{branch.address}</TableCell>
      <TableCell align="right">
        <EditButton
          tooltipText="Modificar sucursal"
          onClick={() => navigate(`/branches/add/${branch.id}`)}
        />
        {branch.deleted_at ? (
          <ActivateButton
            tooltipText="Habilitar sucursal"
            onClick={() => handleActivateBranch(branch.id)}
          />
        ) : (
          <DeactivateButton
            tooltipText="Desactivar sucursal"
            onClick={() => handleDeleteBranch(branch.id)}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
