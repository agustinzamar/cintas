import { Box } from '@/components/common/Box';
import { TableContent } from '@/components/Table/TableContent';
import { NewOrderTableRow } from '@/components/Table/Orders/NewOrderTableRow';

const headCells = [
  { id: 'vendor', label: 'Proveedor' },
  { id: 'product', label: 'Articulo' },
  { id: 'color', label: 'Color' },
  { id: 'size', label: 'Talla' },
  { id: 'quantity', label: 'Cantidad' },
  { id: 'additional_information', label: 'Observaciones' },
];
export const NewOrderTable = ({ items }) => {
  return (
    <Box>
      <TableContent
        records={items}
        headCells={headCells}
        row={NewOrderTableRow}
      />
    </Box>
  );
};
