import { TableContent } from '@/components/Table/TableContent';
import { UsersTableRow } from '@/components/Table/Users/UsersTableRow';
import { useGetAllUsers } from '@/hooks/users/useGetAllUsers';
import { Box } from '@/components/common/Box';

const headCells = [
  { id: 'name', label: 'Nombre', isSortable: true },
  { id: 'email', label: 'Email', isSortable: true },
  { id: 'role', label: 'Rol', isSortable: true },
  { id: 'branch', label: 'Sucursal', isSortable: true },
  { id: 'status', label: 'Estado', isSortable: true },
  { id: 'actions', label: '', isSortable: false },
];
export const UsersTable = () => {
  const { isLoading, data } = useGetAllUsers();

  return (
    <Box>
      <TableContent
        headCells={headCells}
        records={data}
        isLoading={isLoading}
        row={UsersTableRow}
      />
    </Box>
  );
};
