import { useState } from 'react';
import {
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  ThemeProvider,
} from '@mui/material';
import { esES } from '@mui/material/locale';
import { TableHeader } from './TableHeader';

const theme = createTheme({}, esES);

function genericDescendingComparator(a, b, orderBy) {
  let v1, v2;

  v1 = a[orderBy] || '';
  v2 = b[orderBy] || '';

  if (isNaN(v1)) {
    v1 = String(v1).toLowerCase().trim();
    v2 = String(v2).toLowerCase().trim();
  }

  if (v2 < v1) return -1;
  if (v2 > v1) return 1;
  return 0;
}

function getComparator(order, orderBy, descendingComparator) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const TableContent = props => {
  const {
    headCells,
    records,
    comparator = genericDescendingComparator,
    defaultRowsPerPage,
    rowFunctions,
  } = props;
  const Row = props.row;

  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(parseInt(defaultRowsPerPage));

  const handleSortRequest = (_, property) => {
    const isAscending = orderBy === property && orderDirection === 'asc';
    setOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const getRecords = () => {
    const stabilizedRowArray = records.map((x, i) => [x, i]);
    const c = getComparator(orderDirection, orderBy, comparator);

    stabilizedRowArray.sort((a, b) => {
      const order = c(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    const dataArray = stabilizedRowArray.map(x => x[0]);

    return dataArray.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  const rows = getRecords();

  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table>
          <TableHeader
            headCells={headCells}
            orderBy={orderBy}
            orderDirection={orderDirection}
            handleSortRequest={handleSortRequest}
          />
          <TableBody>
            {rows.length > 0 ? (
              rows.map(x => {
                return <Row key={x.id} data={x} {...rowFunctions} />;
              })
            ) : (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  Aún no hay nada aqui.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={records.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
};
