import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

export const TableHeader = props => {
  const { orderBy, orderDirection, headCells, handleSortRequest } = props;

  const createSortHandler = property => event => {
    handleSortRequest(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(x => {
          return (
            <TableCell component="th" key={x.id}>
              {x.isSortable ? (
                <TableSortLabel
                  active={orderBy === x.id}
                  direction={orderBy === x.id ? orderDirection : 'asc'}
                  onClick={createSortHandler(x.id)}
                >
                  {x.label}
                </TableSortLabel>
              ) : (
                <span>{x.label}</span>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};
