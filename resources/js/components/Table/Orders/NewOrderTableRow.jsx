import { TableCell, TableRow } from '@mui/material';
import { DeleteButton } from '@/components/common/IconButtons/DeleteButton';

export const NewOrderTableRow = ({ data: item, onDeleteItem }) => {
  return (
    <TableRow key={item.id}>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.vendor_name}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.color}</TableCell>
      <TableCell>{item.size}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{item.additional_information}</TableCell>
      <TableCell align="right">
        <DeleteButton
          tooltipText="Eliminar artículo"
          onClick={() => onDeleteItem(item.id)}
        />
      </TableCell>
    </TableRow>
  );
};
