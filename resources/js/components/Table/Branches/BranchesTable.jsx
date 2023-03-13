import { TableContent } from '@/components/Table/TableContent';
import { BranchesTableRow } from '@/components/Table/Branches/BranchesTableRow';
import { useGetAllCompanies } from '@/hooks/companies/useGetAllCompanies';
import { Box } from '@/components/common/Box';

const headCells = [
  { id: 'name', label: 'Nombre', isSortable: true },
  { id: 'city', label: 'Ciudad', isSortable: true },
  { id: 'province', label: 'Provincia', isSortable: true },
  { id: 'address', label: 'Dirección', isSortable: true },
  { id: 'actions', label: '', isSortable: false },
];
export const BranchesTable = () => {
  const { data, isLoading } = useGetAllCompanies();

  return (
    <Box>
      <TableContent
        records={data}
        headCells={headCells}
        row={BranchesTableRow}
        isLoading={isLoading}
      />
    </Box>
  );
};
