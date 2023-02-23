import { TableContent } from '@/components/Table/TableContent';
import { Box } from '@/components/common/Box';
import { VendorsTableRow } from '@/components/Table/Vendors/VendorsTableRow';
import { useGetAllVendors } from '@/hooks/vendors/useGetAllVendors';

const headCells = [
  { id: 'name', label: 'Nombre', isSortable: true },
  { id: 'email', label: 'Email', isSortable: true },
  { id: 'phone', label: 'Teléfono', isSortable: true },
  { id: 'status', label: 'Estado', isSortable: true },
  { id: 'actions', label: '', isSortable: false },
];
export const VendorsTable = () => {
  const { data, isLoading } = useGetAllVendors();

  return (
    <Box>
      <TableContent
        records={data}
        headCells={headCells}
        row={VendorsTableRow}
        isLoading={isLoading}
      />
    </Box>
  );
};
