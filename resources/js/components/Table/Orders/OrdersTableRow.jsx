import { TableCell, TableRow } from '@mui/material';
import { EditButton } from '@/components/common/IconButtons/EditButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { RoleEnum } from '@/enums/RoleEnum';
import { PrintButton } from '@/components/common/IconButtons/PrintButton';
import { OrderStatusEnum } from '@/enums/OrderStatusEnum';
import { EyeButton } from '@/components/common/IconButtons/EyeButton';

export const OrdersTableRow = ({ data: order }) => {
  const navigate = useNavigate();
  const { auth: user } = useAuth();

  const roleId = user.role?.id;
  const isManager = roleId === RoleEnum.MANAGER;
  const isAdmin = roleId === RoleEnum.ADMIN || roleId === RoleEnum.SUPERADMIN;
  const isWarehouseManager = roleId === RoleEnum.WAREHOUSE_MANAGER;

  const handlePrint = () => {};

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
          <PrintButton
            onClick={handlePrint}
            tooltipText="Imprimir pedido"
            disabled={order.status?.id === OrderStatusEnum.DRAFT}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
