import { TableCell, TableRow } from '@mui/material';
import { DeleteButton } from '@/components/common/IconButtons/DeleteButton';

export const NewOrderTableRow = ({ data: item }) => {
  const handleDelete = id => {};

  return (
    <TableRow key={item.id}>
      <TableCell>{item.vendor.name}</TableCell>
      <TableCell>{item.product_name}</TableCell>
      <TableCell>{item.product_color}</TableCell>
      <TableCell>{item.product_size}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{item.additional_information}</TableCell>
      <TableCell align="right">
        <DeleteButton
          tooltipText="Eliminar artículo"
          handleClick={() => handleDelete(item.id)}
        />
      </TableCell>
    </TableRow>
  );
};
