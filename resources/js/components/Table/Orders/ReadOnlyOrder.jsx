import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import MuiCheckbox from '@mui/material/Checkbox';

export const ReadOnlyOrder = ({ order }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>Articulo</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Talle</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Observaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order?.items &&
            order.items.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <MuiCheckbox />
                </TableCell>
                <TableCell>{item.vendor?.name}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.additional_details}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
