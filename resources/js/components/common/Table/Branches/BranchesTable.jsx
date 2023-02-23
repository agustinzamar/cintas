import { TableContent } from '@/components/common/Table/TableContent';
import { BranchesTableRow } from '@/components/common/Table/Branches/BranchesTableRow';
import { useGetAllCompanies } from '@/hooks/companies/useGetAllCompanies';

const headCells = [
  { id: 'name', label: 'Nombre', isSortable: true },
  { id: 'city', label: 'Ciudad', isSortable: true },
  { id: 'province', label: 'Provincia', isSortable: true },
  { id: 'address', label: 'Dirección', isSortable: true },
  { id: 'status', label: 'Estado', isSortable: true },
  { id: 'actions', label: '', isSortable: false },
];
export const BranchesTable = () => {
  const { data, isLoading } = useGetAllCompanies();

  return (
    <TableContent
      records={data}
      headCells={headCells}
      row={BranchesTableRow}
      isLoading={isLoading}
    />
  );
};
