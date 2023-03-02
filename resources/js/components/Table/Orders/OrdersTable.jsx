import { useGetAllOrders } from '@/hooks/orders/useGetAllOrders';
import { OrdersTableRow } from '@/components/Table/Orders/OrdersTableRow';
import { TableContent } from '@/components/Table/TableContent';
import { Box } from '@/components/common/Box';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { RoleEnum } from '@/enums/RoleEnum';

const managerHeadCells = [
  { id: 'id', label: 'Pedido #', isSortable: true },
  { id: 'created_by', label: 'Creado por', isSortable: true },
  { id: 'created_at', label: 'Fecha de creación', isSortable: true },
  { id: 'status', label: 'Estado', isSortable: true },
  { id: 'actions', label: '', isSortable: false },
];

const warehouseManagerHeadCells = [
  { id: 'id', label: 'Pedido #', isSortable: true },
  { id: 'created_by', label: 'Creado por', isSortable: true },
  { id: 'created_at', label: 'Fecha de creación', isSortable: true },
  { id: 'company', label: 'Sucursal', isSortable: true },
  { id: 'actions', label: '', isSortable: false },
];

const adminHeadCells = [
  { id: 'id', label: 'Pedido #', isSortable: true },
  { id: 'created_by', label: 'Creado por', isSortable: true },
  { id: 'created_at', label: 'Fecha de creación', isSortable: true },
  { id: 'company', label: 'Sucursal', isSortable: true },
  { id: 'status', label: 'Estado', isSortable: true },
  { id: 'actions', label: '', isSortable: false },
];

export const OrdersTable = () => {
  const { data: orders, isLoading } = useGetAllOrders();
  const { auth: user } = useAuth();
  const [headCells, setHeadCells] = useState([]);

  useEffect(() => {
    const roleId = user.role?.id;

    if (roleId === RoleEnum.MANAGER) {
      setHeadCells(managerHeadCells);
      return;
    }

    if (roleId === RoleEnum.WAREHOUSE_MANAGER) {
      setHeadCells(warehouseManagerHeadCells);
      return;
    }

    setHeadCells(adminHeadCells);
  }, [user, orders]);

  return (
    <Box>
      <TableContent
        headCells={headCells}
        records={orders}
        row={OrdersTableRow}
        isLoading={isLoading}
      />
    </Box>
  );
};
