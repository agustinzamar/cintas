import { useState } from 'react';
import {
  Box,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { esES } from '@mui/material/locale';
import { TableHeader } from './TableHeader';
import { Loader } from '@/components/common/Loader';
import EmptyData from '@/assets/img/emptyData.png';

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
    records = [],
    comparator = genericDescendingComparator,
    defaultRowsPerPage = 5,
    isLoading = false,
    onDeleteItem = null,
  } = props;
  const Row = props.row;

  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
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

  if (isLoading) return <Loader />;

  if (rows?.length === 0)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          p: 4,
        }}
      >
        <img src={EmptyData} alt="No hay datos" style={{ margin: 'auto' }} />
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Aun no hay nada por aqui
        </Typography>
      </Box>
    );

  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table>
          <TableHeader
            headCells={headCells}
            orderBy={orderBy}
            orderDirection={orderDirection}
            handleSortRequest={handleRequestSort}
          />
          <TableBody>
            {rows?.length > 0 ? (
              rows.map(data => {
                return (
                  <Row key={data.id} data={data} onDeleteItem={onDeleteItem} />
                );
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
        rowsPerPage={rowsPerPage}
        page={page}
        count={records.length}
        component="div"
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
};
