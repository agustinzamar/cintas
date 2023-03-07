import { TableCell, TableRow } from '@mui/material';
import { EditButton } from '@/components/common/IconButtons/EditButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { RoleEnum } from '@/enums/RoleEnum';
import { PrintButton } from '@/components/common/IconButtons/PrintButton';
import { OrderStatusEnum } from '@/enums/OrderStatusEnum';
import { EyeButton } from '@/components/common/IconButtons/EyeButton';
import { DeleteButton } from '@/components/common/IconButtons/DeleteButton';
import { useMutation, useQueryClient } from 'react-query';
import OrdersApi from '@/api/OrdersApi';
import { toast } from 'react-toastify';
import { Order as OrderPdf } from '@/components/pdf/Order';
import { PDFDownloadLink } from '@react-pdf/renderer';

export const OrdersTableRow = ({ data: order }) => {
  const navigate = useNavigate();
  const { auth: user } = useAuth();

  const roleId = user.role?.id;
  const isManager = roleId === RoleEnum.MANAGER;
  const isAdmin = roleId === RoleEnum.ADMIN || roleId === RoleEnum.SUPERADMIN;
  const isWarehouseManager = roleId === RoleEnum.WAREHOUSE_MANAGER;
  const { mutate } = useMutation(OrdersApi.delete);
  const queryClient = useQueryClient();

  const handleDelete = id => {
    mutate(id, {
      onSuccess: () => {
        toast.success('Pedido cancelado exitosamente.');
        queryClient.invalidateQueries('orders');
      },
      onError: () => toast.error('Lo sentimos, algo salió mal'),
    });
  };

  return (
    <TableRow>
      <TableCell>#{order.id}</TableCell>
      <TableCell>{order.user?.name}</TableCell>
      <TableCell>{order.created_at}</TableCell>
      {!isManager && <TableCell>{order.company?.name}</TableCell>}
      {(isAdmin || isManager) && <TableCell>{order.status?.name}</TableCell>}
      <TableCell align="right">
        {order.status?.id !== OrderStatusEnum.DRAFT && (
          <EyeButton
            onClick={() => navigate(`/orders/view/${order.id}`)}
            tooltipText="Ver Pedido"
          />
        )}

        {(isManager || isAdmin) &&
          order.status?.id === OrderStatusEnum.DRAFT && (
          <EditButton
            onClick={() => navigate(`/orders/new/${order.id}`)}
            tooltipText="Modificar pedido"
          />
        )}

        {(isWarehouseManager || isAdmin) &&
          order.status?.id !== OrderStatusEnum.DRAFT && (
          <PDFDownloadLink
            document={<OrderPdf order={order} />}
            fileName={`Pedido #${order.id} - ${order?.company?.name}`}
          >
            {({ loading }) => (
              <PrintButton
                onClick={() => {}}
                tooltipText="Imprimir pedido"
                disabled={loading}
              />
            )}
          </PDFDownloadLink>
        )}

        {order.status?.id === OrderStatusEnum.DRAFT && (
          <DeleteButton
            onClick={() => handleDelete(order.id)}
            tooltipText="Eliminar borrador"
          />
        )}
      </TableCell>
    </TableRow>
  );
};
