import { TableCell, TableRow } from '@mui/material';
import { EditButton } from '@/components/common/IconButtons/EditButton';
import { ActivateButton } from '@/components/common/IconButtons/ActivateButton';
import { DeactivateButton } from '@/components/common/IconButtons/DeactivateButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import VendorsApi from '@/api/VendorsApi';

export const VendorsTableRow = ({ data: vendor }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleDeleteVendor = vendorId => {
    VendorsApi.delete(vendorId)
      .then(() => {
        toast.success('Proveedor desactivado exitosamente');
        queryClient.invalidateQueries(['vendors']);
      })
      .catch(() => toast.error('Algo salio mal'));
  };

  const handleActivateVendor = vendorId => {
    VendorsApi.restore(vendorId)
      .then(() => {
        toast.success('Proveedor activado exitosamente');
        queryClient.invalidateQueries(['vendors']);
      })
      .catch(() => toast.error('Algo salio mal'));
  };

  return (
    <TableRow key={vendor.id}>
      <TableCell>{vendor.name}</TableCell>
      <TableCell>{vendor.email}</TableCell>
      <TableCell>{vendor.phone}</TableCell>
      <TableCell align="right">
        <EditButton
          tooltipText="Modificar proveedor"
          onClick={() => navigate(`/vendors/add/${vendor.id}`)}
        />
        {vendor.deleted_at ? (
          <ActivateButton
            tooltipText="Activar proveedor"
            onClick={() => handleActivateVendor(vendor.id)}
          />
        ) : (
          <DeactivateButton
            tooltipText="Desactivar proveedor"
            onClick={() => handleDeleteVendor(vendor.id)}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
