import { Box } from '@/components/common/Box';
import { TableContent } from '@/components/Table/TableContent';
import { NewOrderTableRow } from '@/components/Table/Orders/NewOrderTableRow';

const headCells = [
  { id: 'id', label: '#' },
  { id: 'vendor', label: 'Proveedor' },
  { id: 'product', label: 'Articulo' },
  { id: 'color', label: 'Color' },
  { id: 'size', label: 'Talle' },
  { id: 'quantity', label: 'Cantidad' },
  { id: 'additional_information', label: 'Observaciones' },
  { id: 'actions', label: '' },
];
export const NewOrderTable = ({ items, onDeleteItem }) => {
  return (
    <Box>
      <TableContent
        records={items}
        headCells={headCells}
        row={NewOrderTableRow}
        onDeleteItem={onDeleteItem}
      />
    </Box>
  );
};
