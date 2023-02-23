import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { UsersTable } from '@/components/common/Table/Users/UsersTable';

export const UsersList = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/users/add"
        >
          Nuevo usuario
        </Button>
      </Grid>
      <Grid item xs={12}>
        <UsersTable />
      </Grid>
    </Grid>
  );
};
