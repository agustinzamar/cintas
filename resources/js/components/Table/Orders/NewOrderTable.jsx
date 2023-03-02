import { Box } from '@/components/common/Box';
import { TableContent } from '@/components/Table/TableContent';
import { NewOrderTableRow } from '@/components/Table/Orders/NewOrderTableRow';

const headCells = [
  { id: 'vendor', label: 'Proveedor' },
  { id: 'product', label: 'Articulo' },
  { id: 'color', label: 'Color' },
  { id: 'size', label: 'Talle' },
  { id: 'quantity', label: 'Cantidad' },
  { id: 'additional_information', label: 'Observaciones' },
  { id: 'actions', label: '' },
];
export const NewOrderTable = ({ items, onDeleteItem }) => {
  const handleDeleteItem = itemToRemove => {
    const index = items.indexOf(itemToRemove);
    onDeleteItem(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  return (
    <Box>
      <TableContent
        records={items}
        headCells={headCells}
        row={NewOrderTableRow}
        onDeleteItem={handleDeleteItem}
      />
    </Box>
  );
};
